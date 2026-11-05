import { useState } from "react";
import Header from "../../../components/header";
import { useResumes } from "../../../contexts/ResumeContext";
import { ActivityIcon, BedDouble, BotOff, BrushCleaningIcon, Bubbles, DeleteIcon, DownloadIcon, GrabIcon, RecycleIcon, SearchAlertIcon, TextSelect, TrashIcon } from "lucide-react";
import api from "../../auth/api/axiosInstance";
import { toast } from "sonner";
import DashboardLoading from "../../../components/LoadingScreen";
import { Link } from "react-router-dom";



export default function Resumes() {

    type Category = "view_resumes" | "add_resume"
    const { resumes, isLoading, setResumes, refreshResumes } = useResumes();

    const [category, setCategory] = useState<Category>("view_resumes");
    const [deleteResumeId, setDeleteResumeId] = useState(null);

    const formatDate = (date: string) => {

        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const makeDefault = async (id: string, name: string) => {

        try {

            const response = await api.patch(
                `resume/${id}/default`
            )

            if (response.status != 200) {
                console.error("Unable to make the resume as default selection")
                toast.error("Internal Server Error", {
                    description: "Unable to make the resume as default selection"
                })
            }

            const data = response.data
            console.log(data.message)
            toast.success(data.message, {
                description: `${name} - resume has set to default successfully`
            })

            await refreshResumes();


        } catch (error) {
            console.error("Error resume make default", error)
            toast.error("Error resume make default")
        }

    }

    const deleteResume = async (id: string, name: string) => {


        try {

            const response = await api.delete(
                `resume/${id}`
            )

            if (response.status != 200) {
                console.error("Unable to delete resume due to internal server error")
                toast.error("Unable to delete resume", {
                    description: "Unable to delete resume due to internal server error"
                })
            }



            const data = response.data
            console.log(data.message)
            toast.success(data.message, {
                description: `${name} - resume has deleted successfully`
            })

            await refreshResumes()


        } catch (error) {
            console.log("Error in delete resume")
            toast.error("Error while deleting resume", {
                description: "Resume cannot delete or invalid error"
            })
        }
    }

    const downloadResume = async (id: string, name: string) => {

        try {

            const response = await api.get(
                `resume/download/${id}`,

                {
                    responseType: "blob",
                }
            )

            if (response.status != 200) {
                console.error("Unable to download resume due to internal server error")
                toast.error("Unable to download resume", {
                    description: "Unable to download resume due to internal server error"
                })
            };

            const data = response.data;

            const blob = new Blob([data], {
                type: "application/pdf"
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = name;

            document.body.appendChild(link);
            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            console.log(`${name} - resume downloaded successfully`);
            toast.success(`${name} - resume downloaded successfully`);

        } catch (error) {
            console.log("Error in downloading resume")
            toast.error("Error while downloading resume", {
                description: "Resume cannot download or invalid error"
            })
        }
    }



    return (

        isLoading ? (
            <DashboardLoading />
        ) : (

            <div className="flex flex-col bg-white w-screen">

                <div className="flex-col">

                     <Header />


                            <div className="flex flex-col w-full items-center mt-8 ">

                                <div className="rounded-full bg-linear-to-r from-blue-600 to-violet-600 p-[2px]">

                                    <div className="relative gap-5 text-sm  transition duration-300  px-4 py-2 rounded-full shadow-lg bg-white">

                                        <div
                                            className={`absolute top-2 bottom-2 w-[calc(50%-12px)] rounded-full bg-linear-to-r from-blue-600 to-violet-600 transition-all duration-600 ease-in-out
                                        ${category === "view_resumes"
                                                    ? "left-2"
                                                    : "left-[calc(50%+2px)]"
                                                }
                                    `}
                                        />

                                        <button
                                            onClick={() => setCategory("view_resumes")}
                                            className={`relative px-5 py-1 rounded-full z-10
                                        ${category == "view_resumes"
                                                    ? "font-semibold text-[17px]  text-white bg-linear-to-r from-blue-600 to-violet-600"
                                                    : "font-normal text-[15px] text-slate-700 hover:text-blue-900"
                                                }`}>
                                            View Resumes
                                        </button>

                                        <button
                                            onClick={() => setCategory("add_resume")}
                                            className={`relative z-10 px-5 py-1 rounded-full 
                                        ${category == "add_resume"
                                                    ? "font-semibold text-[17px]  text-white bg-linear-to-r from-blue-600 to-violet-600"
                                                    : ""
                                                }`}>
                                            Add Resume
                                        </button>

                                    </div>
                                </div>


                        </div>

                </div>

                {
                    category == "view_resumes" && (
                        <div className="flex-col">

                            <div className="flex-col mt-15 mb-15 px-4 py-2 items-center border border-slate-200 bg-white rounded-lg shadow-2xl">


                                <div className="rounded-lg bg-linear-to-r from-blue-600/40 to-violet-600/50 p-[5px]">

                                    <div className="flex-col m-2">


                                        <div className="flex-col">


                                            <div className="flex flex-col gap-3">

                                                {
                                                    resumes?.map((resume) => (


                                                        <div key={resume.id} className="flex flex-col gap-1 px-3 py-1 mx-3 my-1 border border-slate-100 bg-white rounded-lg shadow-md">

                                                            <div className="flex justify-between items-center gap-5 px-3 py-1 mx-3 my-1">
                                                                <div>
                                                                    <h2 className="text-[18px] my-1  font-semibold font-sans"> {resume.filename} </h2>

                                                                </div>

                                                                <div>

                                                                    <h3 className="text-[16px]"> {formatDate(resume.create_at)}</h3>
                                                                </div>


                                                            </div>

                                                            <div className="flex gap-1 justify-between px-3 py-2">

                                                                <div className="flex">

                                                                    <button
                                                                        onClick={() => downloadResume(resume.id, resume.filename)}
                                                                        className="text-sm text-blue-700 px-2 py-1 hover:text-blue-500 focus:scale-90">
                                                                        <DownloadIcon className="h-4 w-4" />
                                                                    </button>

                                                                    <button
                                                                        onClick={() => setDeleteResumeId(resume.id)}
                                                                        className="text-sm text-red-700 px-2 py-1 hover:text-red-500">
                                                                        <TrashIcon className="h-4 w-4" />

                                                                    </button>

                                                                </div>

                                                                {
                                                                    deleteResumeId == resume.id && (
                                                                        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">

                                                                            <div className="w-110 rounded-xl bg-white shadow-xl ">
                                                                                <h2 className="text-lg font-semibold m-2 px-3 py-2">
                                                                                    Delete Resume?
                                                                                </h2>

                                                                                <p className="mt-2 text-sm text-gray-600 m-2 px-3 py-2">
                                                                                    Are you sure you want to delete this resume?
                                                                                    This action cannot be undone.
                                                                                </p>

                                                                                <div className="m-3 px-3 py-2 flex justify-end gap-3">
                                                                                    <button
                                                                                        onClick={() => {

                                                                                            setDeleteResumeId(null)
                                                                                        }
                                                                                        }
                                                                                        className="rounded-lg px-4 py-1 text-sm text-gray-700 hover:bg-gray-100">
                                                                                        Cancel
                                                                                    </button>


                                                                                    <button
                                                                                        onClick={() => {
                                                                                            deleteResume(resume.id, resume.filename)

                                                                                        }}
                                                                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:bg-red-600
                                                                                        focus:scale-95"
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    )}

                                                                <div className="flex items-center">


                                                                    {resume.is_default ? (
                                                                        <div className="flex items-center">

                                                                            <button className="text-sm text-violet-600 px-2 py-1 font-medium">
                                                                                Default
                                                                            </button>
                                                                        </div>

                                                                    ) : (
                                                                        <div className="flex items-center gap-2">

                                                                            <button
                                                                                className="text-sm text-red-600 px-2 py-1 font-medium">
                                                                                Not Default
                                                                            </button>

                                                                            <button onClick={() => makeDefault(resume.id, resume.filename)}
                                                                                className="px-2 py-1 bg-violet-600 text-white rounded-lg text-sm
                                                                            hover:bg-green-500 hover:text-gray-100 focus:bg-green-400 shadow-lg focus:scale-95">
                                                                                Make Default
                                                                            </button>


                                                                        </div>
                                                                    )}
                                                                </div>

                                                            </div>
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>



                            </div>


                        </div>

                    )
                }

            </div>
        )




    )
}