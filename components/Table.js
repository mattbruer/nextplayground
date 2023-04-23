import React from 'react';
import cheerio from 'cheerio';
import styles from '@/styles/Table.module.css';

const Table = ({ table }) => {
  return (
    <div className={styles.wrapper}>
      <table>
        <thead id={styles.j}>
          <tr>
            {table?.headings.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table?.rows.map((r, i) => {
            return (
              <tr key={i}>
                {r.map((d, i) => {
                  return <td key={i}>{d}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            {table.footer.map((el, i) => {
              console.log('el', el);
              return (
                <th colSpan={i === 0 ? 3 : 1} key={i}>
                  {el}
                </th>
              );
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
