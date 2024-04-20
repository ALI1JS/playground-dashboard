import React from "react";
import { Link } from "react-router-dom";

interface OwnerProps {
    label1?:string,
    label2?:string,
    label3?: string,
    label4?: string,
    label5?: number | string,
    label6?: number | string,
    id:string,
    activate?:()=>void,
    UnActivate?: ()=>void,
    delete?: ()=>void,
    view?: ()=>void
}

const OwnerRow: React.FC<OwnerProps> = (props)=>{

    return(
        <tr>
          <td className="px-4 py-2">{props.label1}</td>
          <td className="px-4 py-2">{props.label2}</td>
          <td className="px-4 py-2">{props.label3}</td>
          <td className="px-4 py-2">{props.label4}</td>
          <td className="px-4 py-2">{props.label5}</td>
          <td className="px-4 py-2">{props.label6}</td>
          <td className="px-4 py-2 flex gap-2">
            {
                props.activate&& 
                <>
                <button onClick={props.activate} className="hover:bg-blue-600 bg-blue-500 text-white font-bold cursor-pointer px-3 py-2 rounded">Activate</button>
                <button onClick={props.UnActivate} className="hover:bg-red-600 bg-red-500 text-white font-bold cursor-pointer px-3 py-2 rounded">UnActivate</button>
                </>
            }
            {
              !props.activate&& 
              <button onClick={props.delete} className="hover:bg-red-600 bg-red-500 text-white font-bold cursor-pointer px-3 py-2 rounded">Delete</button>
            }
            {
              props.label4 !=="Docs"&&
              <Link to={`/owner/${props.id}`}>
                <button onClick={props.view} className="hover:bg-blue-600 bg-blue-500 text-white font-bold cursor-pointer px-3 py-2 rounded">View</button>
              </Link>
            }

          </td>
        </tr>
    )
}

export default OwnerRow;