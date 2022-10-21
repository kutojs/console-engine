/**
 *
 * @param {number} refreshRate
 * @param {object} config
 */
module.exports = function start(refreshRate, config) {
  if (!refreshRate || !config) {
    return console.error(
      new TypeError("Missing parameters, either 'refreshRate' or 'config'")
    );
  }

  var rows = [];
  var table = require("./controller").sessionConfig.table;
  table = table.sort(
    (first, second) => first.row < second.row && first.col < second.col
  );

  table.forEach((tab) => {
    if (rows.findIndex((t) => t.row == tab.row) == -1) {
      rows.push({
        row: tab.row,
        value: "test",
      });
    }
  });

  setInterval(() => {
    try {
      console.clear();

      table = require("./controller").sessionConfig.table;
      table = table.sort(
        (first, second) => first.row < second.row && first.col < second.col
      );

      Object.keys(rows).forEach((index) => {
        var row = rows[index];

        row.value = "";
      });

      table.forEach((tab) => {
        var row = rows[rows.findIndex((t) => t.row == tab.row)];

        row.value = row.value + tab.value;
      });

      rows = rows.sort((first, second) => first.row < second.row);
      rows.forEach((row) => {
        config.out.write(row.value);
      });

      console.log(rows, table);
    } catch (err) {
      console.error(err);
    }
  }, refreshRate);
};
