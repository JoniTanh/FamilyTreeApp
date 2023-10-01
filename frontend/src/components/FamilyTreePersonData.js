import { useState, useEffect } from "react";
import "../assets/familyTree.css";

const FamilyTreePersonData = ({
  setSelectedPerson,
  selectedPerson,
  selectedPersonData,
}) => {
  const [personDataList, setPersonDataList] = useState([]);

  useEffect(() => {
    if (selectedPerson?.id) {
      let personData = {
        mother: null,
        father: null,
        spouses: [],
        siblings: [],
      };

      const personCache = {};

      selectedPersonData.forEach((entry) => {
        if (entry.person._id === selectedPerson.id) {
          personData.mother = entry.mother;
          personData.father = entry.father;
          if (entry.spouse) {
            const existingSpouse = personData.spouses.find(
              (spouse) => spouse._id === entry.spouse._id
            );
            if (existingSpouse) {
              existingSpouse.children = [
                ...existingSpouse.children,
                ...entry.children,
              ];
            } else {
              personData.spouses.push({
                ...entry.spouse,
                children: entry.children,
              });
            }
          }
          if (!personCache[entry.mother?._id] && entry.mother) {
            personData.mother = entry.mother;
            personCache[entry.mother._id] = true;
          }
          if (!personCache[entry.father?._id] && entry.father) {
            personData.father = entry.father;
            personCache[entry.father._id] = true;
          }
        } else if (
          entry.children.some((child) => child._id === selectedPerson.id)
        ) {
          entry.children.forEach((sibling) => {
            if (
              sibling._id !== selectedPerson.id &&
              !personData.siblings.some((s) => s._id === sibling._id)
            ) {
              personData.siblings.push(sibling);
            }
          });

          if (!personCache[entry.spouse?._id] && entry.spouse) {
            personData.mother = entry.spouse;
            personCache[entry.spouse._id] = true;
          }
          if (!personCache[entry.person?._id] && entry.person) {
            personData.father = entry.person;
            personCache[entry.person._id] = true;
          }
        } else if (entry.spouse && entry.spouse._id === selectedPerson.id) {
          const existingSpouse = personData.spouses.find(
            (spouse) => spouse._id === entry.person._id
          );
          if (existingSpouse) {
            existingSpouse.children = [
              ...existingSpouse.children,
              ...entry.children,
            ];
          } else {
            personData.spouses.push({
              ...entry.person,
              children: entry.children,
            });
          }
        }
      });

      setPersonDataList(personData);
    } else {
      setPersonDataList([]);
    }
  }, [selectedPerson, selectedPersonData]);

  const getParentsString = (motherName, fatherName) => {
    fatherName = fatherName || "tuntematon";
    motherName = motherName || "tuntematon";
    return `${fatherName} & ${motherName}`;
  };

  return (
    <div className="selectedTreePersonContainer">
      <div>
        <button
          className="btn btn-outline closeSelectedPerson"
          onClick={() => setSelectedPerson(null)}
        >
          x
        </button>
      </div>
      <div className="selectedTreePerson">
        <h4>{selectedPerson?.id ? selectedPerson?.name : "tuntematon"}</h4>
        <div>
          {personDataList && selectedPerson?.id && (
            <div>
              <div>
                <div className="selectedTreePersonHeader">Vanhemmat</div>
                <div>
                  {getParentsString(
                    personDataList.mother
                      ? personDataList.mother.firstNames +
                          " " +
                          personDataList.mother.lastName
                      : null,
                    personDataList.father
                      ? personDataList.father.firstNames +
                          " " +
                          personDataList.father.lastName
                      : null
                  )}
                </div>
              </div>
              {personDataList.spouses?.map((spouse, index) => (
                <div key={index}>
                  <div>
                    <div className="selectedTreePersonHeader">
                      #{index + 1} Puoliso
                    </div>
                    <div>
                      {spouse?.firstNames} {spouse?.lastName}
                    </div>
                  </div>
                  <div>
                    {spouse.children.length > 0 && (
                      <div>
                        <div className="selectedTreePersonHeader">
                          #{index + 1} Lapset
                        </div>
                        <div>
                          {spouse.children
                            .map(
                              (child) =>
                                `${child?.firstNames} ${child?.lastName}`
                            )
                            .join(", ")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {personDataList.siblings?.length > 0 && (
                <div>
                  <div className="selectedTreePersonHeader">Sisarukset</div>
                  <div>
                    {personDataList.siblings
                      .map(
                        (sibling) =>
                          `${sibling?.firstNames} ${sibling?.lastName}`
                      )
                      .join(", ")}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyTreePersonData;
