import React from "react";


const Footer:React.FC =()=>{


    return (
           <div className="bg-slate-100 font-bold flex justify-around flex-wrap gap-5 px-5 py-10 absolute w-[100vw] -bottom-[150px] right-0">
                 <div>
                    <h2>Developed and Designed By <span className="text-2xl"> ALI ISMAIL</span></h2>
                </div>  
                <div>
                     <ul>
                        <li>01120450953</li>
                        <li>aliisamilh08@gmail.com</li>
                     </ul>
                </div>
           </div>
    )
}

export default Footer;