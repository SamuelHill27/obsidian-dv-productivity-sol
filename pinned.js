const pinned = ["Current", "Projects", "Uni Notes"];

dv.span("---");

const flexContainer = dv.el('div', '', { cls: 'flex-container' });
flexContainer.style.cssText = `
  display: flex;
  justify-content: space-between;
`;

dv.span("---");

pinned.forEach(p => {
    const link = dv.el('h3', dv.fileLink(p), { cls: 'flex-item' });
    link.style.cssText = `
        flex: 1;
        margin: 10px;
    `;
    flexContainer.appendChild(link);
});