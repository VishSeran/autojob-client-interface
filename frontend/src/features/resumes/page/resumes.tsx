import { useRef, useState } from "react";
import Header from "../../../components/header";
import { useResumes } from "../../../contexts/ResumeContext";
import {DownloadIcon, FileText, TrashIcon, UploadIcon } from "lucide-react";
import api from "../../auth/api/axiosInstance";
import { toast } from "sonner";
import DashboardLoading from "../../../components/LoadingScreen";



export default function Resumes() {

    type Category = "view_resumes" | "add_resume"
    const { resumes, isLoading, setResumes, refreshResumes } = useResumes();

    const [category, setCategory] = useState<Category>("view_resumes");
    const [deleteResumeId, setDeleteResumeId] = useState(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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

    const deleteResume = async (id:any, name: string) => {


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

    const handleFileUpload = (file:File) => {

        const allowedTypes = [
            "application/pdf"
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.warning("Please upload a PDf file");
            return;
        }

        setSelectedFile(file)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (file) {
            handleFileUpload(file);
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {

        e.preventDefault();
        setIsDragging(true);

        const file = e.dataTransfer.files?.[0]

        if(file){
            handleFileUpload(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null)

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };



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
                        <div className="flex-col transition-all duration-300">

                            <div className="flex-col mt-15 mb-15 px-4 py-2 items-center border border-slate-200 bg-white rounded-lg shadow-2xl">


                                <div className="relative rounded-lg border border-slate-800 bg-slate-900 shadow-lg p-[5px]">
                                    <div className="absolute pointer-events-none h-120 w-120 bg-blue-600/20 -top-32 -left-32 rounded-full blur-3xl "/>
                            <div className="absolute pointer-events-none h-120 w-120 bg-violet-600/20 -bottom-32 -right-32 rounded-full blur-3xl "/>

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

                                                                    <div className="hover:scale-110">

                                                                        <button
                                                                            onClick={() => downloadResume(resume.id, resume.filename)}
                                                                            className="text-sm text-blue-700 px-2 py-1 hover:text-blue-500 focus:scale-90">
                                                                            <DownloadIcon className="h-4 w-4" />
                                                                        </button>
                                                                    </div>

                                                                    <div className="hover:scale-110">

                                                                        <button
                                                                            onClick={() => setDeleteResumeId(resume.id)}
                                                                            className="text-sm text-red-700 px-2 py-1 hover:text-red-500">
                                                                            <TrashIcon className="h-4 w-4" />

                                                                        </button>
                                                                    </div>

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

                                                                                    <div className="hover:scale-110">

                                                                                    <button
                                                                                        onClick={() => {
                                                                                            deleteResume(resume.id, resume.filename)

                                                                                        }}
                                                                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 focus:bg-red-600
                                                                                        "
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                    </div>
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

                {
                    category == "add_resume" && (
                        
                        <div className="relative w-full max-w-4xl mx-auto overflow-hidden
                        rounded-3xl border border-slate-800 bg-slate-950 shadow-lg mt-10 mb-7">

                            <div className="absolute pointer-events-none h-120 w-120 bg-blue-600/20 -top-32 -left-32 rounded-full blur-3xl "/>
                            <div className="absolute pointer-events-none h-120 w-120 bg-violet-600/20 -bottom-32 -right-32 rounded-full blur-3xl "/>


                            <div className="relative flex flex-col items-center justify-center px-8 py-16 md:px-16">

                                <div className="text-center mb-8">
                                    <h2 className="text-3xl md:text-4xl 
                                    font-bold text-white shadow-lg">
                                        Upload your resume
                                    </h2>

                                    <p className="text-slate-400 mt-3 text-sm md:text-base">
                                        Upload your resume and let AutoJob analyze
                                        your skills and experience.
                                    </p>
                                </div>

                                <div className="group w-full max-w-2xl min-h-[270px]
                                flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg
                                bg-slate-900/50 transition-all duration-300 hover:border-blue-500/70 hover:bg-slate-900
                                cursor-pointer">

                                    <div className="flex items-center justify-center h-20 w-20 bg-linear-to-br 
                                    from-blue-600/20 to-violet-600/20 rounded-3xl border border-blue-500/20
                                    group-hover:scale-110 transition-all duration-300">

                                        <UploadIcon className="h-10 w-10 text-blue-500 group-hover:text-blue-300"/>
                                    </div>


                                    <h2 className="mt-6 text-lg text-white font-semibold">Drag & drop your resume here</h2>

                                    <p className="mt-2 text-slate-500 text-sm">or {" "}
                                        <span className="text-blue-400 font-medium hover:text-blue-200">browse file</span>
                                    </p>

                                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 ">

                                        <FileText className="h-4 w-4"/>

                                        <span>PDF</span>

                                        <span>•</span>

                                        <span>Max 10 MB</span>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-6 mb-5 text-xs text-slate-600 text-center">

                                Your resume will be securely processed and used
                                to improve your job matching.
                            </div>

                        </div>

                    )
                }

            </div>
        )




    )
}