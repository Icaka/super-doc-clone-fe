"use client"
import {apiClient} from "@/api/client";
import {ChangeEvent, useEffect, useState} from "react";
import {Doctor as DoctorModel} from "@/api/models"

export default function DoctorList() {
    const [allDoctors, setAllDoctors] = useState<DoctorModel[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchedDoctors, setSearchedDoctors] = useState<DoctorModel[] | null>(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.currentTarget.value);
    }

    useEffect(() => {
        async function getAllDoctors(){
            const allDoctors: DoctorModel[] = await apiClient.getDoctors();
            setAllDoctors(allDoctors)
        }
        getAllDoctors()
    }, []);

    useEffect(() => {
        async function searchDoctors() {
            const searchedDoctors = await apiClient.searchDoctor(searchQuery);
            setSearchedDoctors(searchedDoctors);
        }
        searchDoctors();
    }, [searchQuery, searchedDoctors]);

    const searchButton = () => {
        setAllDoctors(searchedDoctors)
    }

    return(
        <>
            <div className="mt-8 p-2" style={{border:'1px solid'}}  >
                <form>
                    <label>Search:
                        <input style={{border:'1px solid'}}
                               type="text"
                               value={searchQuery}
                               onChange={handleChange}
                        />
                    </label>
                </form>
                <button style={{padding: '10px 8px',backgroundColor: 'skyblue'}}
                        onClick={searchButton}
                        color="#841584"
                >Search</button>
            </div>
            <div className="mt-8 p-2" style={{border:'1px solid'}}>
                {allDoctors?.map((d)=>
                    <p key={d.id}><a href={"/doctors/" + d.id}>{d.firstName} {d.lastName}</a></p>)
                }
            </div>
        </>
    )
}