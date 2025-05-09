const FooterSection = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <ul className="space-y-2 text-gray-400">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href || "#"} className="hover:text-white transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
