"use client";

import { useState } from "react";

export default function ExtendedProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        location: "",
        role: "",
        experience: "",
        isStudent: "",
        school: "",
        graduationMonth: "",
        graduationYear: "",
        majors: [""],
        degree: "",
        jobTitle: "",
        company: "",
        unemployed: false,
        linkedin: "",
        website: "",
    });

    const handleChange = (name: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

       try {
         const res = await fetch("/api/profile" , {
             method : "POST",
             headers : {
                 "Content-Type" : "application/json",
             },
             body : JSON.stringify(formData)
         });
 
         const data = await res.json();
 
         if(!res.ok) {
             throw new Error(data.error || "Something went wrong")
         }
 
            alert("Profile Created!");
       } catch (error) {
        alert("Failed to create profile");
       }
    }
    const handleMajorChange = (index: number, value: string) => {
        const updated = [...formData.majors];
        updated[index] = value;
        setFormData((prev) => ({ ...prev, majors: updated }));
    };

    const addMajor = () => {
        setFormData((prev) => ({
            ...prev,
            majors: [...prev.majors, ""],
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg mx-auto space-y-8 p-6 bg-white text-black"
        >
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create your profile
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Fill in your details below.
                </p>
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm">First Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                        placeholder="First Name"
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm">Last Name</label>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                        placeholder="Last Name"
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
                <label className="text-sm">Where are you based?</label>
                <p className="text-xs text-gray-500">
                    Tip: You can choose a city, state, or country
                </p>
                <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                    placeholder="Search for a location"
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                />
            </div>

            {/* Role */}
            <div className="space-y-1">
                <label className="text-sm">Current role</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-black"
                    onChange={(e) => handleChange("role", e.target.value)}
                    required
                >
                    <option value="">Select a role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="manager">Manager</option>
                    <option value="student">Student</option>
                </select>
            </div>

            {/* Experience */}
            <div className="space-y-1">
                <label className="text-sm">Years of experience</label>
                <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-black"
                    onChange={(e) => handleChange("experience", e.target.value)}
                    required
                >
                    <option value="">Select experience</option>
                    <option value="0-1">0–1</option>
                    <option value="1-3">1–3</option>
                    <option value="3-5">3–5</option>
                    <option value="5+">5+</option>
                </select>
            </div>

            {/* Student */}
            <div className="space-y-1">
                <label className="text-sm">Are you a student?</label>
                <div className="flex gap-6 text-sm">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="student"
                            value="yes"
                            onChange={(e) => handleChange("isStudent", e.target.value)}
                        />
                        Yes
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="student"
                            value="no"
                            onChange={(e) => handleChange("isStudent", e.target.value)}
                        />
                        No
                    </label>
                </div>
            </div>
            {formData.isStudent === "yes" && (
                <div className="space-y-6 border-t pt-6">
                    <h2 className="text-lg font-medium">
                        Education
                    </h2>

                    {/* School */}
                    <div className="space-y-1">
                        <label className="text-sm">
                            What school are you attending?
                        </label>
                        <input
                            placeholder="Search for a school"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                            onChange={(e) => handleChange("school", e.target.value)}
                            required
                        />
                    </div>

                    {/* Graduation */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm">Graduation Month</label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-black"
                                onChange={(e) =>
                                    handleChange("graduationMonth", e.target.value)
                                }
                                required
                            >
                                <option value="">Select month</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm">Graduation Year</label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-black"
                                onChange={(e) =>
                                    handleChange("graduationYear", e.target.value)
                                }
                                required
                            >
                                <option value="">Select year</option>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i}>{2020 + i}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Majors */}
                    <div className="space-y-2">
                        <label className="text-sm">What are you studying?</label>
                        <p className="text-xs text-gray-500">
                            Tell employers about your field of study
                        </p>

                        {formData.majors.map((major, index) => (
                            <input
                                key={index}
                                value={major}
                                placeholder="Enter major name"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                                onChange={(e) =>
                                    handleMajorChange(index, e.target.value)
                                }
                                required
                            />
                        ))}

                        <button
                            type="button"
                            onClick={addMajor}
                            className="text-sm text-black underline"
                        >
                            + Add another major
                        </button>
                    </div>

                    {/* Degree */}
                    <div className="space-y-1">
                        <label className="text-sm">
                            What kind of degree are you getting?
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-black"
                            onChange={(e) => handleChange("degree", e.target.value)}
                            required
                        >
                            <option value="">Select degree type</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="phd">PhD</option>
                            <option value="diploma">Diploma</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Work */}
            <div className="space-y-4">
                <div>
                    <label className="text-sm">Work</label>
                    <p className="text-xs text-gray-500">
                        Your company won’t see this
                    </p>
                </div>

                <input
                    placeholder="Job Title"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                />

                <input
                    placeholder="Company"
                    disabled={formData.unemployed}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black disabled:bg-gray-100"
                    onChange={(e) => handleChange("company", e.target.value)}
                />

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={formData.unemployed}
                        onChange={(e) =>
                            handleChange("unemployed", e.target.checked)
                        }
                    />
                    I'm not currently employed
                </label>
            </div>

            {/* Links */}
            <div className="space-y-3">
                <input
                    type="url"
                    placeholder="LinkedIn Profile"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                    onChange={(e) => handleChange("linkedin", e.target.value)}
                />

                <input
                    type="url"
                    placeholder="Website"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                    onChange={(e) => handleChange("website", e.target.value)}
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-900 transition"
            >
                Create your profile
            </button>
        </form>
    );
}