import React, { useRef, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
const links: { name: string; link: string; width?: number }[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];
function getCurrentState(): [number, string] {
  const currentRoute = window.location.pathname;
  let activeLinkIndex: number = 0;
  const currentLink = links.find((link, index) => {
    if (link.link === currentRoute) {
      activeLinkIndex = index;
      return true;
    }
    return false;
  });
  return [activeLinkIndex, currentLink?.name.toLowerCase() || "home"];
}
export default function Header() {
  const [activeLinkIndex, activeLinkName] = getCurrentState();
  const backdrop = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(activeLinkName);

  useEffect(() => {
    const backdropStyles = backdrop.current!.style;
    const activeLink = backdrop.current!.parentElement!.children[
      activeLinkIndex
    ] as HTMLAnchorElement;
    backdropStyles.transition = "none";
    backdropStyles.width = `${activeLink.offsetWidth}px`;
    backdropStyles.translate = `${activeLink.offsetLeft - 5}px 0`;
    backdropStyles.removeProperty("transition");
  }, [backdrop]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const link = e.target as HTMLAnchorElement;
    if (link.classList.contains("active")) return;
    const backdropStyles = backdrop.current!.style;
    backdropStyles.translate = `${link.offsetLeft - 5}px 0`;
    backdropStyles.width = `${link.offsetWidth}px`;
    const index = Array.from(link.parentElement!.children).indexOf(link);
    setActive(links[index].name.toLowerCase());
  }, []);

  return (
    <header>
      <h3>My Portfolio</h3>
      <ul>
        {links.map((link) => (
          <Link
            onClick={handleClick}
            to={link.link}
            key={link.name}
            className={`nav-link__${link.name.toLowerCase()}${
              link.name.toLowerCase() === active ? " active" : ""
            }`}
          >
            {link.name === "Projects" && (
              <div className="nav-link__projects-icon">20</div>
            )}
            {link.name}
          </Link>
        ))}
        <div ref={backdrop} className="nav-link__backdrop"></div>
      </ul>
      <button className="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
