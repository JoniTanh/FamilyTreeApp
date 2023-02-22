import { useState, useEffect, useRef } from "react";
import familytableService from "../services/familytables";
import "../assets/familyTree.css";
import React from "react";
import dTree from "d3-dtree";
import _ from "lodash";
import * as d3 from "d3";
window.d3 = d3;

const FamilyTree = () => {
  const [familytables, setFamilytables] = useState([]);
  const graphContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const familytables = await familytableService.getAll();
      setFamilytables(familytables);
    };
    fetchData();
  }, []);

  const person = familytables[0] ? familytables[0].person : null;

  useEffect(() => {
    if (familytables.length > 0) {
      renderTree();
    }
  }, [familytables]);

  const renderTree = () => {
    let person = "Person";
    let mother = "Mother";
    let father = "Father";
    let spouse = "Spouse";
    let children = ["Child1", "Child2"];

    if (familytables[0]) {
      person = familytables[0].person.firstNames;
      mother = familytables[0].mother.firstNames;
      father = familytables[0].father.firstNames;
      spouse = familytables[0].spouse.firstNames;
      children = familytables[0].children.map((child) => child.firstNames);
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
  }, [familytables]);

  return (
    <FamilyTreeGraph
      person={person}
      familyTables={familytables}
      graphContainer={graphContainer}
    />
  );
};

class FamilyTreeGraph extends React.Component {
  render() {
    const { graphContainer, person } = this.props;
    const title = `${person?.firstNames} ${person?.lastName}'s Family Tree`;

    return (
      <>
        {console.log(this.props)}
        <div className="familyTreesvg">
          <h1 style={{ textAlign: "center" }}>{title}</h1>
          <div ref={graphContainer} id="graph"></div>
        </div>
      </>
    );
  }
}

export default FamilyTree;
