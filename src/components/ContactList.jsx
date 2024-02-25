import {Table} from "antd";
import ListLoading from "./Loader/ListLoading.jsx";
import {useGetAllContactQuery, useUpdateContactStatusMutation} from "../redux/features/contact/contactApi.js";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Message",
        dataIndex: "message"
    },
    {
        title: "Status",
        dataIndex: "status",
    }
];

const ContactList = () => {
    const {data, isLoading, isError} = useGetAllContactQuery();
    const contacts = data?.data || [];
    const [updateContactStatus] = useUpdateContactStatusMutation();




    //update status
    const handleUpdateStatus = (status, id) => {
        updateContactStatus({
            id,
            data:{
                status
            }
        })
    }





    const tableData = [];



    if (!isLoading && !isError && contacts?.length > 0) {
        for (let i = 0; i < contacts.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: contacts[i].name,
                email: contacts[i].email,
                message: contacts[i].message,
                status: (
                    <>
                        <select key={Date.now()} defaultValue={contacts[i].status} onChange={(e)=>handleUpdateStatus(e.target.value, contacts[i]?._id)} className="border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </>
                ),
            });
        }

    }



    return (
        <>
            <div>
                <h1 className="text-center text-3xl font-bold mb-3">Contact List</h1>

                {
                    isLoading ? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <>

                            <div className="w-auto overflow-x-auto">
                                <Table columns={columns} dataSource={tableData}/>
                            </div>
                        </>
                    )
                }
            </div>

        </>
    )
        ;
};

export default ContactList;