import React from "react";
import OwnerRow from "../table/row.comp";
import TableHead from "../table/head.comp";



const OwnerView: React.FC = () => {


    const viewHandle = () => {
        console.log("dispaly")
    }

    return (
        <div className="container mx-auto bg-white rounded py-3">
            <div className="overflow-x-auto">
                <h2 className="font-bold text-slate-400 p-3">Latest 10 Owners</h2>
                <table className="table-auto min-w-full">
                    <TableHead label1="name" label2="email" label3="Phone" label4="Location" label5="Price / Hour" label6="Clients Number" label7="Actions" />
                    <tbody className="bg-white divide-y divide-gray-200">

                    <OwnerRow id="1" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="2" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="3" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="4" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="5" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="6" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                    <OwnerRow id="7" label1="ALI" label2="aliismailh08@gmail.com" label3="01120450953" label4="Minya" label5={100} label6={200}  view={viewHandle} />
                       
                    </tbody>
                </table>
            </div>
        </div>

    )
}


export default OwnerView;