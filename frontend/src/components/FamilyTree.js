import "../assets/familyTree.css";
import React from "react";
import dTree from "d3-dtree";
import _ from "lodash";
import * as d3 from "d3";
window.d3 = d3;

class FamilyTree extends React.Component {
  componentDidMount() {
    let treeData = [
      {
        name: "Isovaari",
        class: "man",
        textClass: "emphasis",
        marriages: [
          {
            spouse: {
              name: "Isomummo",
              class: "woman",
              extra: {
                nickname: "Illi",
              },
            },
            children: [
              {
                name: "Isä",
                class: "man",
                marriages: [
                  {
                    spouse: {
                      name: "Äiti",
                      class: "woman",
                    },
                    children: [
                      {
                        name: "Poika",
                        class: "man",
                        marriages: [
                          {
                            spouse: {
                              name: "Tyttöystävä",
                              class: "woman",
                            },
                          },
                        ],
                      },
                      {
                        name: "Tyttö",
                        class: "woman",
                      },
                      {
                        name: "Poika",
                        class: "man",
                      },
                      {
                        name: "Tyttö",
                        class: "woman",
                      },
                      {
                        name: "Tyttö",
                        class: "woman",
                      },
                      {
                        name: "Tyttö",
                        class: "woman",
                      },
                    ],
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
