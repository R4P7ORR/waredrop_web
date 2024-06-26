import '../Styles/Control.css';
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Warehouse from "../Components/Warehouse/Warehouse";
import WarehouseList from "../Components/Warehouse/WarehouseList";
import WarehouseContext from "../Contexts/WarehouseContext";
import {useNavigate} from "react-router-dom";

interface WarehouseDisplayProps{
    loginToken: string;
    setCurrentPage: (page: string) => void;
}
function WarehouseDisplay({loginToken, setCurrentPage}: WarehouseDisplayProps) {
    const navigate = useNavigate();
    const {
        warehouseList, setWarehouseList,
        overlayType, setOverlayType,
        editingWarehouse, setEditingWarehouse,
        deletingWarehouse, setDeletingWarehouse,
        isAdmin
    } = useContext(WarehouseContext);

    useEffect(() => {
        if(loginToken !== "none"){
            if (isAdmin){
                axios.get('http://localhost:3001/warehouses', {
                    headers: {authorization: "Bearer " + loginToken}
                }).then(res => {
                    setWarehouseList(res.data);
                }).catch(error => {
                    if (error.response.status === 401){
                        navigate('/unauthorized');
                    }
                });
            } else {
                axios.get('http://localhost:3001/warehouses/user', {
                    headers: {authorization: "Bearer " + loginToken}
                }).then(res => {
                    setWarehouseList(res.data);
                }).catch(error => {
                    if (error.response.status === 401){
                        navigate('/unauthorized');
                    }
                });
            }
        }
    }, [isAdmin, overlayType]);
    return (
        <>
            {isAdmin&&
                <div className="warehouse-operator-buttons">
                    <button onClick={() => setOverlayType("warehouseAddForm")}>Add new</button>
                    <button className={editingWarehouse?"selected-button": ""} onClick={() => {
                        setEditingWarehouse(!editingWarehouse);
                        setDeletingWarehouse(false);
                    }}>{!editingWarehouse? "Modify" : "Done"}</button>
                    <button className={deletingWarehouse?"selected-button": ""}  onClick={() => {
                        setDeletingWarehouse(!deletingWarehouse);
                        setEditingWarehouse(false);
                    }}>{!deletingWarehouse? "Delete" : "Done"}</button>
                </div>
            }
            {warehouseList.length === 0 || warehouseList[0].warehouse_name === "empty" ?
                <div>
                    <h1>You don't have any assigned Warehouses yet.</h1>
                </div>
                :
                <div className="container-listed-warehouses">
                    {warehouseList.sort((a,b) => {
                        return a.warehouse_id > b.warehouse_id ? 1: -1;
                    }).map((warehouse: Warehouse) => (
                        <WarehouseList key={warehouse.warehouse_id}
                                       assigned_user_id={warehouse.assigned_user_id}
                                       warehouse_id={warehouse.warehouse_id}
                                       warehouse_name={warehouse.warehouse_name}
                                       location={warehouse.location}
                                        setCurrentPage={setCurrentPage}/>
                    ))}
                </div>
            }
        </>
    )
}

export default WarehouseDisplay;