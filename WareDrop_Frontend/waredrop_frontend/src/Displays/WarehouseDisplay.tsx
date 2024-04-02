import '../Styles/Control.css';
import axios from "axios";
import {useEffect, useState} from "react";
import Warehouse from "../Components/Warehouse/Warehouse";
import WarehouseList from "../Components/Warehouse/WarehouseList";
interface WarehouseDisplayProps{
    loginToken: string;
    setType: (type: string) => void;
}
function WarehouseDisplay({setType, loginToken}: WarehouseDisplayProps) {
    const [warehouseList, setWareHouseList] = useState<Warehouse[]>([]);

        useEffect(() => {
            if (loginToken !== "none"){
                axios.get('http://localhost:3001/warehouses', {
                    headers: {authorization: "Bearer " + loginToken}
                }).then(res => {
                    if (res.data.length === 0){
                        setWareHouseList([{warehouse_id: -1, warehouse_name: "empty", location: "nothing"}]);
                    } else{
                        setWareHouseList(res.data);
                    }
                });
            }}, [loginToken]);
    function addNewWarehouse(name: string, location: string){
        axios.post("http://localhost:3001/warehouses/new", {
            warehouseName: name,
            location: location
        }).then(res =>{
            console.log(res)
        })
    }
    return (
        <>
            <button onClick={() => setType("warehouseForm")}>Add new</button>
            {warehouseList.length === 0 || warehouseList[0].warehouse_name === "empty" ?
                <div>
                    <h1>You don't have any Warehouses registered yet.</h1>
                </div>
                :
                <div>
                    {warehouseList.map((warehouse: Warehouse) => (
                        <WarehouseList key={warehouse.warehouse_id} setType={setType}
                                       warehouse_id={warehouse.warehouse_id} warehouse_name={warehouse.warehouse_name}
                                       location={warehouse.location}/>
                    ))}
                </div>
            }
        </>
    )
}

export default WarehouseDisplay;