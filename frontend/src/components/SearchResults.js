import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import peopleService from "../services/people";
import familytableService from "../services/familytables";
import HomeButton from "./buttons/HomeButton";
import { SearchIcon } from "../assets/Icons";
import Search from "./Search";

const SearchResults = () => {
  const { state } = useLocation();

  const [people, setPeople] = useState([]);
  const [familyTables, setFamilyTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      const familyTables = await familytableService.getAll();
      setPeople(people);
      setFamilyTables(familyTables);
    };

    fetchData();
  }, [setPeople, state]);

  const searchWords = state
    ? state
        .toLowerCase()
        .split(/,\s+/)
        .map((word) => word.replace(/\s*,\s*/g, ","))
    : [];

  const matchesSearch = (item) => {
    return searchWords.some((word) =>
      JSON.stringify(item).toLowerCase().includes(word.trim())
    );
  };

  const filteredPeople = people.filter(matchesSearch);

  const filteredFamilyTables = familyTables.filter((familyTable) => {
    return matchesSearch(familyTable);
  });

  const countSearchOccurrences = (item) => {
    return searchWords.reduce((count, word) => {
      const match = JSON.stringify(item)
        .toLowerCase()
        .match(new RegExp(word.trim(), "g"));
      return count + (match ? match.length : 0);
    }, 0);
  };

  const totalPeopleOccurrences = people.reduce((total, person) => {
    return total + countSearchOccurrences(person);
  }, 0);

  const totalFamilyTableOccurrences = familyTables.reduce(
    (total, familyTable) => {
      return total + countSearchOccurrences(familyTable);
    },
    0
  );

  const Highlight = ({ text = "", searchWords = [] }) => {
    const regex = new RegExp(`(${searchWords.join("|")})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const RenderPerson = ({ person, isPersonCard = false }) => {
    const personId = person?.id || person?._id;

    return (
      <div>
        <div className="shortInformation">
          <div className="searchIdContainer">
            <div>
              <b>{isPersonCard ? "Henkilön ID-tunnus:" : "ID-tunnus"} </b>
              <Highlight text={personId} searchWords={searchWords} />{" "}
              {isPersonCard && (
                <Link to={`/search`} state={personId}>
                  <SearchIcon />
                </Link>
              )}
            </div>
            {isPersonCard && (
              <Link to={`/people/${personId}`}>
                <button className="btn btn-outline-primary searchPageButton">
                  Näytä henkilö
                </button>
              </Link>
            )}
          </div>
          <div>
            <b>{isPersonCard ? "Henkilön nimi: " : "Nimi: "}</b>
            <Highlight
              text={`${person?.firstNames} ${person?.lastName}`}
              searchWords={searchWords}
            />
          </div>
        </div>

        <div className={isPersonCard ? "searchCardContent" : ""}>
          {person?.nickname && (
            <div>
              <b>Kutsumanimi: </b>
              <Highlight text={person.nickname} searchWords={searchWords} />
            </div>
          )}
          {person?.family && (
            <div>
              <b>Oma suku: </b>
              <Highlight text={person?.family} searchWords={searchWords} />
            </div>
          )}
          {person?.allFamilies && (
            <div>
              <b>Muut suvut, joihin kuuluu: </b>
              <Highlight text={person.allFamilies} searchWords={searchWords} />
            </div>
          )}
          {(person?.birthTime || person?.birthPlace) && (
            <div>
              <b>Syntynyt: </b>
              <Highlight
                text={`${person?.birthTime} ${person?.birthPlace}`}
                searchWords={searchWords}
              />
            </div>
          )}
          {person?.baptismDay && (
            <div>
              <b>Kastepäivä: </b>
              <Highlight text={person.baptismDay} searchWords={searchWords} />
            </div>
          )}
          {person?.godparents && (
            <div>
              <b>Kummit: </b>
              <Highlight text={person.godparents} searchWords={searchWords} />
            </div>
          )}
          {(person?.deathTime || person?.deathPlace || person?.deathReason) && (
            <div>
              <b>Kuollut: </b>
              <Highlight
                text={`${person?.deathTime} ${person?.deathPlace} ${person?.deathReason}`}
                searchWords={searchWords}
              />
            </div>
          )}
          {(person?.burialTime || person?.burialPlot) && (
            <div>
              <b>Haudattu: </b>
              <Highlight
                text={`${person?.burialTime} ${person?.burialPlot}`}
                searchWords={searchWords}
              />
            </div>
          )}
          {person?.lifeStory && (
            <div>
              <b>Pienoiselämänkerta: </b>
              <Highlight text={person.lifeStory} searchWords={searchWords} />
            </div>
          )}
          {person?.sources && (
            <div>
              <b>Lähteet: </b>
              <Highlight text={person.sources} searchWords={searchWords} />
            </div>
          )}
        </div>
      </div>
    );
  };

  const RenderFamilyTable = ({ fb }) => {
    return (
      <div>
        <div className="shortInformation">
          <div className="searchIdContainer">
            <div>
              <b>Perhetaulun ID-tunnus: </b>
              <Highlight text={fb._id} searchWords={searchWords} />{" "}
              <Link to={`/search`} state={fb._id}>
                <SearchIcon />
              </Link>
            </div>
            <Link to={`/familytables/${fb._id}`} state={fb}>
              <button className="btn btn-outline-primary searchPageButton">
                Näytä perhetaulu
              </button>
            </Link>
          </div>
          <div className="mb-1">
            <b>Perhetaulun henkilön nimi: </b>
            <Highlight
              text={`${fb.person?.firstNames} ${fb.person?.lastName}`}
              searchWords={searchWords}
            />
          </div>
        </div>
        <div className="searchCardContent">
          <div>
            <div className="personSearchHeader">Henkilö</div>
            <RenderPerson person={fb.person} title="Henkilö" />
          </div>
          {fb.mother && (
            <div>
              <div className="fbSearchHeader">Äiti</div>
              <RenderPerson person={fb.mother} title="Äiti" />
            </div>
          )}
          {fb.father && (
            <div>
              <div className="fbSearchHeader">Isä</div>
              <RenderPerson person={fb.father} title="Isä" />
            </div>
          )}
          {fb.spouse && (
            <div>
              <div className="fbSearchHeader">Puoliso</div>
              <RenderPerson person={fb.spouse} title="Puoliso" />
            </div>
          )}
          {fb.spouseMother && (
            <div>
              <div className="fbSearchHeader">Puolison äiti</div>
              <RenderPerson person={fb.spouseMother} title="Puolison äiti" />
            </div>
          )}
          {fb.spouseFather && (
            <div>
              <div className="fbSearchHeader">Puolison isä</div>
              <RenderPerson person={fb.spouseFather} title="Puolison isä" />
            </div>
          )}
          <div>
            {fb.children && fb.children.length > 0 && (
              <div>
                <div className="fbSearchHeader">Lapset</div>
                {fb.children.map((child, i) => (
                  <div key={i}>
                    <div className="fbChildHeader">Lapsi #{i + 1}</div>
                    <RenderPerson key={i} person={child} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="fbSearchHeader">Muuta</div>
            {fb.marriedTime && (
              <div>
                <b>Vihitty: </b>
                <Highlight
                  text={`${fb.marriedTime} ${fb.marriedPlace}`}
                  searchWords={searchWords}
                />
              </div>
            )}
            {fb.childrenInformation && (
              <div>
                <b>Lisätietoa lapsista: </b>
                <Highlight
                  text={fb.childrenInformation}
                  searchWords={searchWords}
                />
              </div>
            )}
            {fb.lifeStory && (
              <div>
                <b>Elämänkerta: </b>
                <Highlight text={fb.lifeStory} searchWords={searchWords} />
              </div>
            )}
            {fb.sources && (
              <div>
                <b>Lähteet: </b>
                <Highlight text={fb.sources} searchWords={searchWords} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="searchPage">
      <div className="container">
        <div className="topOptions">
          <div>
            <HomeButton />
          </div>
        </div>
      </div>
      <div className="container searchContainer">
        <div className="searchWords">
          <b>Hakusanat: </b>
          {state}
        </div>
        <div className="searchCounts">
          <b>Hakusana(t) esiintyivät henkilöissä:</b> {totalPeopleOccurrences}{" "}
          kertaa
          <br />
          <b>Hakusana(t) esiintyivät perhetauluissa:</b>{" "}
          {totalFamilyTableOccurrences} kertaa
        </div>
        <div className="searchPageSearch">
          <Search searchPage={true} />
        </div>
        <div>
          {filteredPeople.length > 0 && (
            <div className="searchHeader">Henkilöt</div>
          )}
          {filteredPeople.map((person) => (
            <div className="card cardContent" key={person.id}>
              <RenderPerson person={person} isPersonCard={true} />
            </div>
          ))}
        </div>
        <div>
          {filteredFamilyTables.length > 0 && (
            <div className="searchHeader">Perhetaulut</div>
          )}
          {filteredFamilyTables.map((fb) => (
            <div className="card cardContent" key={fb._id}>
              <RenderFamilyTable fb={fb} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
