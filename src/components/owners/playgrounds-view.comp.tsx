import React from "react";
import TableHead from "../table/head.comp";
import OwnerRow from "../table/row.comp";


const PlayGroundView: React.FC = ()=>{
   
    const deleteHandle = () => {
        console.log("deleted");
    }

    return (

        <div className="container mx-auto bg-white rounded py-3">
        <div className="overflow-x-auto">
            <h2 className="font-bold text-slate-400 p-3">All PlayGrounds</h2>
            <table className="table-auto min-w-full">
                <TableHead label1="Name" label2="Location" label3="Clints Number" label4="Docs" label5="Price/Hour" label6="Catogery" label7="Actions" />
                <tbody className="bg-white divide-y divide-gray-200">
                    <OwnerRow id="1" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />
                    <OwnerRow id="2" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />
                    <OwnerRow id="3" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />
                    <OwnerRow id="4" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />
                    <OwnerRow id="5" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />
                    <OwnerRow id="6" label1="PlayGround1" label2="Minya" label3="300" label4='Docs' label5={100} label6="Football" delete={deleteHandle} />

                </tbody>
            </table>
        </div>
    </div>
    )

}

export default PlayGroundView;