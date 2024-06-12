// const { Pool } = require('pg');

// // RDS 연결 설정
// const dbConfig = {
//   host: 'eduwords-eng.cb20gsk0grwq.us-east-1.rds.amazonaws.com',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'postgres'
// };

// const pool = new Pool(dbConfig);

// module.exports = async (req, res) => {
//   if (req.method === 'POST') {
//     const { mem_id, mem_pw } = req.body;

//     try {
//       const client = await pool.connect();
//       const result = await client.query(
//         'SELECT * FROM tb_member WHERE mem_id = $1 AND mem_pw = $2',
//         [mem_id, mem_pw]
//       );
//       client.release();

//       if (result.rows.length > 0) {
//         const user = result.rows[0];
//         res.status(200).json({
//           success: true,
//           memType: user.mem_type,
//           mem_id: user.mem_id,
//           mem_name: user.mem_name,
//           mem_address: user.mem_address,
//           mem_email: user.mem_email,
//           mem_number: user.mem_number,
//         });
//       } else {
//         res.status(200).json({ success: false });
//       }
//     } catch (error) {
//       console.error('Database query error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };
