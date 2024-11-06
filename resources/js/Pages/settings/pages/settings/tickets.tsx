import { useState } from "react";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import { Link } from '@inertiajs/inertia-react';
import { route } from "ziggy-js";
const Tickets = () => {
    const { tickets, lang: locale } = usePage().props;
    const [filter, setFilter] = useState("All");
    return (
        <DashboardLayout>
            <div className="w-full h-auto mt-20">
                <WelcomeTab />
                <div className="w-full px-2 py-10 sm:px-0">
                    <div
                        style={{
                            backgroundColor: "#2d3a4a",
                            color: "#be9e88",
                            width: "100%",
                            border: "1px solid #be9e88",
                            boxSizing: "border-box",
                        }}
                    >
                        <h1
                            style={{
                                borderBottom: "3px solid #be9e88",
                                display: "inline-block",
                                paddingBottom: "5px",
                                color: "#be9e88",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Support Tickets
                        </h1>
                        <div style={{ marginTop: "15px", marginLeft: "10px" }}>
                            <label>Filter by Status</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                <option value="*">All</option>
                                <option value="open">Open</option>
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                backgroundColor: "#2d3a4a",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                        }}
                                    >
                                        Date
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                        }}
                                    >
                                        Ticket ID
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                        }}
                                    >
                                        Title
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                        }}
                                    >
                                        Category
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                        }}
                                    >
                                        Status
                                    </th>
                                    <th
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #be9e88",
                                            color: "#be9e88",
                                            textAlign: 'center'
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets
                                    .filter(
                                        (ticket) =>
                                            filter === "All" ||
                                            ticket.status === filter
                                    )
                                    .map((ticket) => (
                                        <tr
                                            key={ticket.id}
                                            style={{ textAlign: "center" }}
                                        >
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                    color: "#fff",
                                                }}
                                            >
                                                {ticket.created_human_at}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                    color: "#fff",
                                                }}
                                            >
                                                {ticket.ticket_id}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                    color: "#fff",
                                                }}
                                            >
                                                {ticket.title}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                    color: "#ccc",
                                                }}
                                            >
                                                {
                                                    ticket.ticket_category.name[
                                                        locale
                                                    ]
                                                }
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        backgroundColor:
                                                            "#be9e88",
                                                        padding: "5px 10px",
                                                        borderRadius: "5px",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    borderBottom:
                                                        "1px solid #be9e88",
                                                    color: "#fff",
                                                    textAlign: "center"
                                                }}
                                            >
                                                <Link 
                                                    href={route(
                                                        "client.dashboard.show-ticket",
                                                        {
                                                            id: ticket.id,
                                                        }
                                                    )}
                                                    className="bg-gold hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
export default Tickets;
