import { useState } from "react";

// Works both locally and on GitHub Pages (repo sub-folder)
const BASE = import.meta.env.BASE_URL;

// Put each photo in /public/image/ using the file name given in `image`.
// If a photo is missing, an initials placeholder is shown automatically.
const DATA = {
  "sport man": {
    label: "Sport Man",
    people: [
      { name: "Virat Kohli", image: BASE + "image/virat.jpg" },
      { name: "MS Dhoni", image: BASE + "image/Ms dhoni.jpg" },
      { name: "Rohit Sharma", image: BASE + "image/Rohit Sharma.jpg" },
      { name: "Sachin Tendulkar", image: BASE + "image/Sachin tendulakar.jpg" },
      { name: "Neeraj Chopra", image: BASE + "image/Niraj.jpg" },
    ],
  },
  actress: {
    label: "Actress",
    people: [
      { name: "Preity Mukhandhan", image: BASE + "image/preity-mukhundhan.jpg" },
      { name: "Deepika Padukone", image: BASE + "image/deepika-padukone.jpg" },
      { name: "Alia Bhatt", image: BASE + "image/Alia.jpg" },
      { name: "Priyanka Chopra", image: BASE + "image/priyanaka.jpg" },
      { name: "Rashmika Mandanna", image: BASE + "image/rashmikamandhana.jpg" },
    ],
  },
  actor: {
    label: "Actor",
    people: [
      { name: "Prabhas", image: BASE + "image/prabhas.jpg" },
      { name: "Shah Rukh Khan", image: BASE + "image/srk.jpg" },
      { name: "Allu Arjun", image: BASE + "image/allu arjun.jpg" },
      { name: "Ranbir Kapoor", image: BASE + "image/Ranbir Kapoor.jpg" },
      { name: "Ram Charan", image: BASE + "image/Ramcharan.jpg" },
    ],
  },
  Politician: {
    label: "Politician",
    people: [
      { name: "Narendra Modi", image: BASE + "image/narendra-modi.jpg" },
      { name: "Rahul Gandhi", image: BASE + "image/rahul gandhi.jpg" },
      { name: "Amit Shah", image: BASE + "image/amithsaha.jpg" },
      { name: "Mamata Banerjee", image: BASE + "image/mamta banargee.jpg" },
      { name: "Arvind Kejriwal", image: BASE + "image/arvind keriwal.jpg" },
    ],
  },
};

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function ProfileImage({ person, extraClass }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="person-image placeholder">{initials(person.name)}</div>;
  }
  return (
    <img
      className={`person-image${extraClass ? " " + extraClass : ""}`}
      src={person.image}
      alt={person.name}
      onError={() => setFailed(true)}
    />
  );
}

function PersonThumbnail({ person }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="person-option-avatar person-option-avatar-fallback" aria-hidden="true">{initials(person.name)}</span>;
  }

  return (
    <img
      className="person-option-avatar"
      src={person.image}
      alt=""
      onError={() => setFailed(true)}
    />
  );
}

export default function App() {
  const [category, setCategory] = useState("sport man");
  const [personIndex, setPersonIndex] = useState("");

  const people = DATA[category].people;
  const person = personIndex === "" ? null : people[personIndex];

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setPersonIndex("");
  };

  const handlePersonSelect = (value) => {
    setPersonIndex(value === "" ? "" : Number(value));
  };

  return (
    <main className="page-layout">
      <div className="outside-selectors">
        <div className="selector-group">
          <p className="control-overline">START EXPLORING</p>
          <label className="selector-label" htmlFor="category-select">Choose a category</label>
          <div className="select-wrap">
            <select
              id="category-select"
              className="profile-select"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {Object.entries(DATA).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="selector-group">
          <div className="person-options-heading">
            <p className="selector-label" id="person-options-label">Pick a person</p>
            <span>{String(people.length).padStart(2, "0")} profiles</span>
          </div>
          <div className="select-wrap">
            <select
              id="person-select"
              className="profile-select"
              value={personIndex}
              onChange={(e) => handlePersonSelect(e.target.value)}
              aria-label="Pick a person"
            >
              <option value="">Select a person</option>
              {people.map((p, i) => (
                <option key={p.image} value={i}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="person-options" role="group" aria-labelledby="person-options-label">
            {people.map((p, i) => (
              <button
                className={`person-option${personIndex === i ? " is-selected" : ""}`}
                key={p.image}
                type="button"
                aria-pressed={personIndex === i}
                onClick={() => setPersonIndex(i)}
              >
                <PersonThumbnail person={p} />
                <span className="person-option-copy">
                  <span className="person-option-name">{p.name}</span>
                  <span className="person-option-number">PROFILE {String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="person-option-indicator" aria-hidden="true"><span /></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="header">
          <p className="header-overline"><span /> THE PEOPLE WHO INSPIRE US</p>
          <h1>My Favorites</h1>
          <p>Select a category, then pick a person to reveal a stylish profile card.</p>
        </div>

        <div className="display">
          {person ? (
            <div className="person-card" key={person.name}>
              {/* key forces a fresh image state when the person changes */}
              <ProfileImage
                key={person.image}
                person={person}
                extraClass={person.name === "Virat Kohli" ? "virat" : ""}
              />
              <div>
                <p className="person-tag">{DATA[category].label} <span className="tag-divider">/</span> Selected profile</p>
                <h2 className="person-name">{person.name}</h2>
              </div>
            </div>
          ) : (
            <div className="empty-profile" key="empty">
              <span className="empty-profile-icon" aria-hidden="true">+</span>
              <p className="person-tag">Your profile awaits</p>
              <h2 className="person-name">Choose an icon</h2>
              <p className="empty-profile-hint">Pick a person from the dropdown to see their profile here.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
