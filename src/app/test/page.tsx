// "use client";

// import axios from "axios";
// import { useRef } from "react";

// export default function Page(): JSX.Element {
//   const input = useRef(null);

//   async function click() {
//     console.log("테스트 실행");

//     const inputVal = input.current.value;

//     try {
//       const testReponse = await axios.get(
//         `/api/character?charactername=${encodeURIComponent(inputVal)}`
//       );
//       console.log(testReponse.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   return (
//     <>
//       <button onClick={click} className="w-[10vw] h-[10vh]">
//         서버테스트button
//       </button>
//       <input type="text" ref={input} />
//     </>
//   );
// }
