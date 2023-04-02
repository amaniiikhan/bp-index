import styles from './Table.module.css';

const data = [
  {
    "firstName": "Tanner",
    "lastName": "Linsley",
    "age": 24,
    "visits": 100,
    "status": "In Relationship",
    "progress": 50
  }
];

export default function Table() {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>Age</th>
            <th className={styles.th}>Visits</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>{data[0].firstName}</td>
            <td className={styles.td}>{data[0].lastName}</td>
            <td className={styles.td}>{data[0].age}</td>
            <td className={styles.td}>{data[0].visits}</td>
            <td className={styles.td}>{data[0].status}</td>
            <td className={styles.td}>{data[0].progress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
