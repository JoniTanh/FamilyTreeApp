import "../assets/familyTree.css";
import React from "react";
import dTree from "d3-dtree";
import _ from "lodash";
import * as d3 from "d3";
window.d3 = d3;

// ToDO:
// Korjaa, ettei sivu kaadu / hukkaa valittua tietoa syystä tai toisesta
// Select, jolla pystyy valitsemaan näytettävän henkilön
// Personin, eli "isän/äitin", siskot ja veljet myös lapsineen näkyviin?
// Värikoodejen tilalle jotain muuta
// Mieti, miten data käsitellään yms. yms.

// testiversio

const FamilyTree = ({ familytables }) => {
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

  console.log(treeData);

  return <FamilyTreeGraph treeData={treeData} />;
};

class FamilyTreeGraph extends React.Component {
  componentDidMount() {
    dTree.init(this.props.treeData, {
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
  }

  render() {
    return (
      <>
        <div className="familyTreesvg">
          <h1 style={{ textAlign: "center" }}>Henkilön xx Sukupuu</h1>
          <div id="graph"></div>
        </div>
      </>
    );
  }
}

export default FamilyTree;
