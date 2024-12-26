export default function NavBar({ name, logo = "", components, onClick }) {
  return (
    <div className="navBar">
      <div className="navName">
        <h1>{name}</h1>
      </div>

      <ul className="navItems">
        {components.map((component) => (
          <li key={component.name}>
            {component.border ? (
              <button
                onClick={
                  component.name === "Try for free" ? onClick : undefined
                }
              >
                {component.name}
              </button>
            ) : (
              <button style={{ border: "none" }}>{component.name}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
