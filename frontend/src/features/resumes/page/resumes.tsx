import Header from "../../../components/header";
import { useResumes } from "../../../contexts/ResumeContext";


export default function Resumes() {

    const {resumes, isLoading} = useResumes();

    return (


        <div className="flex-col">

            <Header />

            <div className="flex flex-col w-full items-center mt-8">

                <div className="flex gap-20">
                            <button>
                                View Resumes
                            </button>

                            <button>
                                Add Resume
                            </button>

                        </div>

                <div className="flex-col mt-15 items-center border border-slate-200 bg-slate-200 rounded-lg shadow-2xl">

                    <div className="flex-col">

                        
                        <div className="flex">

                            {
                                resumes?.map((resume) => (
                                    <p> {resume.filename} </p>
                                ))
                            }
                        </div>
                    </div>

                </div>

                
            </div>

        </div>

    )
}