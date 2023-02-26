import { useState, useEffect, useRef } from "react";
import familytableService from "../services/familytables";
import SingleSelect from "./SingleSelect";
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

  const selectPeopleData = familytables.map(({ _id, person }) => ({
    value: _id,
    label: `${person.firstNames} ${person.lastName}`,
  }));

  const handleSelectChange = (field, selectedOption) => {
    setSelectedFamilyTable(selectedOption.value);
  };

  const renderTree = () => {
    let person = "Person";
    let mother = "Mother";
    let father = "Father";
    let spouse = "Spouse";
    let children = [];

    if (result) {
      person = result.person
        ? `${result?.person.firstNames} ${result?.person.lastName}`
        : "Tuntematon";
      mother = result.mother
        ? `${result?.mother.firstNames} ${result?.mother.lastName}`
        : "Tuntematon";
      father = result.father
        ? `${result?.father.firstNames} ${result?.father.lastName}`
        : "Tuntematon";
      spouse = result.spouse
        ? `${result?.spouse.firstNames} ${result?.spouse.lastName}`
        : "Tuntematon";
      children = result.children
        ? result?.children.map(
            (child) => `${child?.firstNames} ${child?.lastName}`
          )
        : "";
    }

    let treeData = [
      {
        name: father,
        class: "man",
        textClass: "emphasis",
        marriages: [
          {
            spouse: {
              name: mother,
              class: "woman",
              extra: {
                nickname: "Illi",
              },
            },
            children: [
              {
                name: person,
                class: "man",
                marriages: [
                  {
                    spouse: {
                      name: spouse,
                      class: "woman",
                    },
                    children: children.map((childName) => {
                      return {
                        name: childName,
                        class: "man",
                        marriages: [
                          {
                            spouse: {
                              name: "Tyttöystävä",
                              class: "woman",
                            },
                          },
                        ],
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
      width: 1400,
      debug: true,
      textRenderer: function (name, textClass) {
        return (
          "<p align='center' className='" + textClass + "'>" + name + "</p>"
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
      ? `${result?.firstNames} ${result?.lastName}'s Family Tree`
      : "Valitse henkilö";

    return (
      <>
        <div className="familyTreesvg">
          <SingleSelect
            selectPeopleData={selectPeopleData}
            handleSelectChange={handleSelectChange}
          />
          <h1 style={{ textAlign: "center" }}>{title}</h1>
          <div ref={graphContainer} id="graph"></div>
        </div>
      </>
    );
  }
}

export default FamilyTree;
