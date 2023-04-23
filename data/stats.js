import cheerio from 'cheerio';
import axios from 'axios';

export default async function fetchTables() {
  try {
    //Swap out urls below for different tables

    const { data } = await axios.get(
      //https://www.maxpreps.com/in/alexandria/alexandria-monroe-tigers/athletes/gabe-mcguire/football/stats/?careerid=v9bof4vgp73dd
      'https://www.maxpreps.com/in/alexandria/alexandria-monroe-tigers/athletes/gabe-mcguire/baseball/stats/?careerid=v9bof4vgp73dd'
    );
    const tableData = [];
    const tables = [];

    const $ = cheerio.load(data);

    $('table').each((i, el) => {
      tableData.push($(el));
    });

    tableData.forEach((table) => {
      const tLeft = {
        headings: [],
        rows: [],
        footer: [],
      };
      const t = {
        headings: [],
        rows: [],
        footer: [],
      };

      $(table)
        .find('th')
        .each((i, el) => {
          t.headings.push($(el).text());
        });

      $(`${table} tbody`)
        .find('tr')
        .each((i, el) => {
          const row = [];
          $(el)
            .find('td')
            .each((i, el) => {
              row.push($(el).text());
            });
          t.rows.push(row);
        });
      t.footer = t.rows.pop();
      tables.push(t);
    });

    return tables;
  } catch (error) {}
}
