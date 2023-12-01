const PersonInfo = ({ person, title, paddingBottom }) => (
  <div className={`${paddingBottom ? "pb-4" : undefined}`}>
    {title && <b>{title}: </b>}
    {person?.firstNames} {person?.nickname && `"${person?.nickname}"`}{" "}
    {person?.lastName}{" "}
    {(person?.birthPlace || person?.birthTime) &&
      `s. ${person?.birthPlace} ${person?.birthTime}`}{" "}
    {(person?.deathPlace || person?.deathTime || person?.deathReason) &&
      `k. ${person?.deathPlace} ${person?.deathTime} ${person?.deathReason}`}
  </div>
);

export default PersonInfo;
