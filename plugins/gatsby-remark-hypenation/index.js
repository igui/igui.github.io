// Uses hyper to insert soft hypen marks to help browsers to render hypenated
// text. This plugin does work only for gatsby-remark. We can extend for other
// uses too.
const visit = require("unist-util-visit");
const Hypher = require("hypher");
const english = require("hyphenation.en-us");

module.exports = ({ markdownAST }) => {
  const hyper = new Hypher(english);

  visit(markdownAST, `text`, (node) => {
    node.value = hyper.hyphenateText(node.value);
  });
};
