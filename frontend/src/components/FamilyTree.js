import { useState, useEffect, useRef } from "react";
import familytableService from "../services/familytables";
import SingleSelect from "../components/singleSelect/SingleSelect";
import "../assets/familyTree.css";
import React from "react";
import dTree from "d3-dtree";
import _ from "lodash";
import * as d3 from "d3";
window.d3 = d3;

const FamilyTree = () => {
  const [familytables, setFamilytables] = useState([]);
  const [selectedFamilyTable, setSelectedFamilyTable] = useState("");
  const graphContainer = useRef(null);
  const result = familytables.find(({ _id }) => _id === selectedFamilyTable);

  useEffect(() => {
    const fetchData = async () => {
      const familytables = await familytableService.getAll();
      setFamilytables(familytables);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (familytables.length > 0 && result) {
      renderTree();
    }
  }, [familytables, result]);

  const selectPeopleData = familytables
    .filter(({ person }) => person)
    .map(({ _id, person, spouse }) => ({
      value: _id,
      label: `${person?.firstNames} ${person?.lastName} ${
        person?.birthTime ? `s. ${person?.birthTime.substr(-4)}` : ""
      } ${spouse ? `& ${spouse?.firstNames} ${spouse?.lastName}` : ""} ${
        spouse?.birthTime ? `s. ${spouse?.birthTime.substr(-4)}` : ""
      }`,
    }));

  const handleSelectChange = (field, selectedOption) => {
    setSelectedFamilyTable(selectedOption.value);
  };

  const renderTree = () => {
    let person = "valittu henkilö";
    let mother = "äiti";
    let father = "isä";
    let spouse = "puoliso";
    let children = [];

    if (result) {
      person = result.person
        ? `${result?.person.firstNames.split(" ")[0]} ${
            result?.person.lastName
          }`
        : "tuntematon";
      mother = result.mother
        ? `${result?.mother.firstNames.split(" ")[0]} ${
            result?.mother.lastName
          }`
        : "tuntematon";
      father = result.father
        ? `${result?.father.firstNames.split(" ")[0]} ${
            result?.father.lastName
          }`
        : "tuntematon";
      spouse = result.spouse
        ? `${result?.spouse.firstNames.split(" ")[0]} ${
            result?.spouse.lastName
          }`
        : "tuntematon";
      children = result.children
        ? result?.children.map(
            (child) => `${child?.firstNames.split(" ")[0]} ${child?.lastName}`
          )
        : "";
    }

    let treeData = [
      {
        name: father,
        class: "human",
        marriages: [
          {
            spouse: {
              name: mother,
              class: "human",
              extra: {
                nickname: "Illi",
              },
            },
            children: [
              {
                name: person,
                class: "human",
                textClass: "person",
                marriages: [
                  {
                    spouse: {
                      name: spouse,
                      class: "human",
                    },
                    children: children.map((childName) => {
                      return {
                        name: childName,
                        class: "human",
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
      height: 600,
      width: 2000,
      debug: false,
      nodeWidth: 150,
      textRenderer: function (name, textClass) {
        return (
          "<div align='center' className='" + textClass + "'>" + name + "</div>"
        );
      },
      nodeRenderer: function (id, textRenderer, name, textClass, nodeClass) {
        let node = "";
        node += "<div ";
        node += 'style="height:100%;width:100%;" ';
        node += 'className="' + nodeClass + '" ';
        node += 'id="node' + id + '">\n';
        node += textRenderer(name, textClass);
        node += "</div>";
        return node;
      },
    });
  };

  useEffect(() => {
    d3.select(graphContainer.current).selectAll("*").remove();
    renderTree();
  }, [familytables, result]);

  return (
    <FamilyTreeGraph
      result={result ? result.person : ""}
      familyTables={familytables}
      graphContainer={graphContainer}
      selectPeopleData={selectPeopleData}
      handleSelectChange={handleSelectChange}
    />
  );
};

class FamilyTreeGraph extends React.Component {
  render() {
    const { graphContainer, result, selectPeopleData, handleSelectChange } =
      this.props;
    const title = result
      ? `${result?.firstNames} ${result?.lastName} -sukupuu`
      : "Valitse henkilö";

    return (
      <div
        style={{
          marginTop: "100px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <div className="familyTreesvg">
          <div>
            <SingleSelect
              selectPeopleData={selectPeopleData}
              handleSelectChange={handleSelectChange}
            />
          </div>
          <h2 style={{ textAlign: "center" }}>{title}</h2>
          <div ref={graphContainer} id="graph"></div>
        </div>
      </div>
    );
  }
}

export default FamilyTree;
