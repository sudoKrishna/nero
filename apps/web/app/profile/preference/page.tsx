"use client";

import { useState } from "react";

export default function Preference () {
    const [formData , setFormData] = useState({
       jobSearch : "",
       jobinterested : "",
       desiredsalary : "",
       role : "",
       location : "",
       usauthorization : "",
       companiessizes : "", 
    });

    const handleChange = (name: string, value : string | boolean) => {
        setFormData((prev) => ({ ...prev, [name] : value}))
    }

    const handleSubmit = async (e : React.FormEvent) =>  {
        e.preventDefault();

        try {
            const res = await fetch("/api/profile/preference" , {
                method : "POST",
                headers : {
                    "Content-Type" : "applicatuon/json",

                },
                body : JSON.stringify(formData)
            })

            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.error || "Something went wrong")
            }
            alert("Continue")
        } catch (error) {
            alert("Failed to create profile")
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto space-y"
        >
            <div className="space-y-1">
                <label className="text-sm">Where are you in your job search?</label>
                <div className="flex gap-6 text-sm">
                    <label className="fles items-center gap-2">
                        <input
                        type="radio"
                        name="jobsearch"
                        value="Ready to interview"
                        onChange={(e) => handleChange("jobsearch", e.target.value)
                        }
                        />
                        Ready to interview
                    </label>
                    <label className="fles items-center gap-2">
                        <input
                        type="radio"
                        name="jobsearch"
                        value="Ready to interview"
                        onChange={(e) => handleChange("jobsearch", e.target.value)
                        }
                        />
                        Open to offers
                    </label>
                    <label className="fles items-center gap-2">
                        <input
                        type="radio"
                        name="jobsearch"
                        value="Ready to interview"
                        onChange={(e) => handleChange("jobsearch", e.target.value)
                        }
                        />
                        Closed to offers
                    </label>
                </div>

            </div>
        </form>    
    )

}
