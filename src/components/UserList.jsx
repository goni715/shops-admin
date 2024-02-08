import {useGetUsersQuery} from "../redux/features/user/userApi.js";
import {Table} from "antd";
import ListLoading from "./Loader/ListLoading.jsx";

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
        title: "Role",
        dataIndex: "role"
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const UserList = () => {
    const {data, isLoading, isError, error} = useGetUsersQuery();
    const users = data?.data || [];


    //decision how to render
    let content = null;


    if (!isLoading && isError) {
        content = (
            <h1>some error occured</h1>
        );

    }

    const tableData = [];


    if (!isLoading && !isError && users?.length > 0) {
        for (let i = 0; i < users.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: users[i]?.firstName+" "+ users[i]?.lastName,
                email: users[i]?.email,
                role: users[i]?.role,
                action: (
                    <>
                        <button className="ml-3 bg-red-500 hover:bg-red-700 px-3 py-2 text-white font-bold text-md rounded-md">
                           Block
                        </button>
                    </>
                ),
            });
        }

    }




    return (
        <>
            <div>
                <h1 className="text-center text-3xl font-bold mb-3">User List</h1>
                {
                    isLoading? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <div className="w-auto overflow-x-auto">
                            <Table columns={columns} dataSource={tableData}/>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default UserList;