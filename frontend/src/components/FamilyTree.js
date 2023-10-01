import { useState, useEffect, useRef } from "react";
import familytableService from "../services/familytables";
import SingleSelect from "../components/SingleSelect";
import "../assets/familyTree.css";
import dTree from "d3-dtree";
import * as d3 from "d3";
import lodash from "lodash";
import FamilyTreePersonData from "./FamilyTreePersonData";

window.d3 = d3;
window._ = lodash;

const FamilyTree = () => {
  const [familytables, setFamilytables] = useState([]);
  const [selectedFamilyTable, setSelectedFamilyTable] = useState("");
  const graphContainer = useRef(null);
  const result = familytables.find(({ _id }) => _id === selectedFamilyTable);

  const [selectedPerson, setSelectedPerson] = useState();
  const [selectedPersonData, setSelectedPersonData] = useState();

  useEffect(() => {
    const filteredFamilyTables = familytables.filter((fb) => {
      return JSON.stringify(fb).includes(selectedPerson?.id);
    });

    setSelectedPersonData(filteredFamilyTables);
  }, [selectedPerson]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await familytableService.getAll();
      setFamilytables(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    d3.select(graphContainer.current).selectAll("*").remove();
    renderTree(result, familytables, setSelectedPerson);
  }, [familytables, result]);

  const selectPeopleData = familytables
    .filter(({ person }) => person)
    .map(({ _id, person, spouse }) => ({
      value: _id,
      label: `${person?.firstNames} ${person?.lastName} ${
        person?.birthTime ? `s. ${person?.birthTime.slice(-4)}` : ""
      } ${spouse ? `& ${spouse?.firstNames} ${spouse?.lastName}` : ""} ${
        spouse?.birthTime ? `s. ${spouse?.birthTime.slice(-4)}` : ""
      }`,
    }));

  const handleSelectChange = (field, selectedOption) => {
    setSelectedFamilyTable(selectedOption?.value);
  };

  const renderTree = (result, familytables, setSelectedPerson) => {
    if (!result || familytables.length === 0) {
      return;
    }

    const formatName = (entity) => {
      if (!entity) return "tuntematon";
      return `${entity?.firstNames.split(" ")[0]} ${entity?.lastName}`;
    };

    const person = formatName(result.person);
    const mother = formatName(result.mother);
    const father = formatName(result.father);
    const spouse = formatName(result.spouse);
    const children = result.children ? result.children.map(formatName) : [];

    const treeData = [
      {
        name: father,
        class: "human",
        extra: {
          name: `${result?.father?.firstNames} ${result?.father?.lastName}`,
          id: result?.father?._id,
        },
        marriages: [
          {
            spouse: {
              name: mother,
              class: "human",
              extra: {
                name: `${result?.mother?.firstNames} ${result?.mother?.lastName}`,
                id: result?.mother?._id,
              },
            },
            children: [
              {
                name: person,
                class: "human",
                textClass: "person",
                extra: {
                  name: `${result?.person?.firstNames} ${result?.person?.lastName}`,
                  id: result.person?._id,
                },
                marriages: [
                  {
                    spouse: {
                      name: spouse,
                      class: "human",
                      extra: {
                        name: `${result?.spouse?.firstNames} ${result?.spouse?.lastName}`,
                        id: result?.spouse?._id,
                      },
                    },
                    children: children.map((childName, id) => {
                      return {
                        name: childName,
                        class: "human",
                        extra: {
                          name: `${result?.children[id]?.firstNames} ${result?.children[id]?.lastName}`,
                          id: result?.children[id]?._id,
                        },
                      };
                    }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    dTree.init(treeData, {
      target: "#graph",
      width: 2000,
      debug: false,
      nodeWidth: 200,
      height: 5000,
      callbacks: {
        nodeClick: function nodeClick(name, extra, id) {
          setSelectedPerson(extra);
        },
        nodeRightClick: function nodeRightClick(name, extra, id) {
          console.log("RIGHT CLICK", name, extra, id);
        },
        // example
        /*nodeRenderer: function nodeRenderer(
          name,
          x,
          y,
          height,
          width,
          extra,
          id,
          nodeClass,
          textClass,
          textRenderer
        ) {
          const node = `<div class="node">${name}</div> <br> <div>ASD</div>`;
          return node;
          //return textRenderer(name, extra, textClass);
        },*/
      },
      styles: {
        node: "node", // testing
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      d3.select(graphContainer.current).selectAll("*").remove();
      renderTree(result, familytables, setSelectedPerson);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [familytables, result, renderTree]);

  return (
    <FamilyTreeGraph
      result={result?.person}
      familyTables={familytables}
      graphContainer={graphContainer}
      selectPeopleData={selectPeopleData}
      handleSelectChange={handleSelectChange}
      setSelectedPerson={setSelectedPerson}
      selectedPerson={selectedPerson}
      selectedPersonData={selectedPersonData}
    />
  );
};

const FamilyTreeGraph = ({
  graphContainer,
  result,
  selectPeopleData,
  handleSelectChange,
  selectedPerson,
  setSelectedPerson,
  selectedPersonData,
}) => {
  const title = result
    ? `${result?.firstNames} ${result?.lastName} -sukupuu`
    : "Valitse henkilö";

  return (
    <div className="pageWrapper">
      <div className="familyTreesvg">
        <SingleSelect
          selectPeopleData={selectPeopleData}
          handleSelectChange={handleSelectChange}
        />
        <h3 style={{ textAlign: "center" }}>{title}</h3>
        <div ref={graphContainer} id="graph"></div>
      </div>
      {selectedPerson && (
        <div>
          <FamilyTreePersonData
            setSelectedPerson={setSelectedPerson}
            selectedPerson={selectedPerson}
            selectedPersonData={selectedPersonData}
          />
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
