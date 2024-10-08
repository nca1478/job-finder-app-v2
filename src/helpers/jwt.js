import { jwtDecode } from 'jwt-decode';

/**
 * Decode JWT
 * @param 	{String} 	token	String token
 * @return	{Object}			Token information
 */
// export const decode = async (token) => {
//   let decodedInfo = await new Promise((resolve, reject) => {
//     try {
//       jwtDecode.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(decoded);
//       });
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   });
//   return decodedInfo;
// };

export const decode = (token) => {
  return jwtDecode(token);
};
