import SideBar from '@/Components/SideBar';
import Navbar from '@/Components/Navbar';
import { router, useForm } from '@inertiajs/react';

export default function Authenticated({ user, header, children, member=null, project=null, jobs=null }) {

    const {data, setData, processing, errors} = useForm({
        email : null,
        job : null,
    })

    const handleAddMember = (e) => {
        // e.preventDefault()
        axios.post(route('project.member.addMember'),{
            project_id : project.project_id,
            email : data.email,
            job : data.job,
        }).then((res) => {
            alert(res.data)
        })
    }

    const handleDeleteMember = (member) => {

        alert('apakah ingin menghapus ' + member.name + ' dari project ' + project.name_project)

        axios.post(route('project.member.delete'),{
            project : project.project_id,
            member : member
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='flex flex-col'>
            {/* NAVBAR */}
            <Navbar user={user}></Navbar>

            <div className='flex flex-row'>
                <SideBar user={user}></SideBar>

                <div className='flex flex-col flex-1 '>
                    {/* HEADER */}
                    <div className='flex flex-row justify-between p-2'>
                        <p className='font-bold bg-red-200 my-auto text-2xl'>{header}</p>

                        {member && (
                            <div className='flex gap-3 min-h-min'>
                                {/* Add User */}
                                <button className="bg-gray-400 hover:bg-gray-500 text-white rounded-2xl px-3" onClick={()=>document.getElementById('modalAddMember_'+project.project_id).showModal()}>add Member +</button>
                                <dialog id={'modalAddMember_'+project.project_id } className="modal">
                                <div className="modal-box">

                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>

                                    <h3 className="font-bold text-2xl border-b-2 mb-4 border-yellow-300">Tambah Member</h3>
                                    <form onSubmit={handleAddMember} className='flex flex-col gap-3'>
                                        <div className='flex flex-col justify-around w-full gap-1'>
                                            <label id='email' className='font-bold'>Email</label>
                                            <input type="text" placeholder="Type email here" className="input input-bordered w-full max-w-xs" onChange={e => setData('email',e.target.value)}/>
                                            {errors.email && <div>{errors.email}</div>}
                                        </div>

                                        <div className='flex flex-col justify-around w-full gap-1'>
                                            <label id='job' className='font-bold'>Job Access</label>
                                            <select className="select select-bordered w-full max-w-xs" onChange={e => setData('job', e.target.value)}>
                                                <option disabled selected>Who shot first?</option>
                                                {jobs.map((job,index) => (
                                                    <option key={index} value={job.job_id}>{job.name_job}</option>
                                                ))}
                                                {/* <option value={'Greedo'}>Greedo</option> */}
                                            </select>
                                            {errors.job && <div>{errors.job}</div>}
                                        </div>

                                        <button type="submit" disabled={processing} className='btn btn-outline btn-success'>Add Member</button>
                                    </form>
                                </div>
                                </dialog>

                                {/* Button Member */}
                                <button onClick={() => document.getElementById('modalMemberProject_').showModal()}>
                                    {/* avatar */}
                                    <div className="avatar-group -space-x-2 rtl:space-x-reverse">
                                        {member.slice(0, 2).map((member, index) => (
                                        <div className="avatar placeholder" key={index}>
                                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                <span className="text-xs">{member.name}</span>
                                            </div>
                                        </div>
                                        ))}

                                        {member.length > 2 && (
                                        <div className="avatar placeholder" key="placeholder">
                                            <div className="w-8 bg-neutral text-neutral-content">
                                            <span>+{member.length - 2}</span>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </button>

                                {/* MODAL List Member */}
                                <dialog id={"modalMemberProject_"} className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg border-b-2 border-red-400">Member</h3>
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Job</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                    {member.filter((member) => !(member.pivot.job_id == 1)).map((member, index) => (
                                                <tr key={index}>
                                                    <th>{index+1}</th>
                                                    <td>{member.name}</td>
                                                    <td>
                                                        <select className="select select-bordered w-full max-w-xs" value={member.pivot.job_id}>
                                                            {/* <option selected>{}</option> */}
                                                            {jobs.map((job, index) => (
                                                                <option key={index} value={job.job_id}>{job.name_job}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-error' onClick={() => handleDeleteMember(member)}>
                                                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                                                        </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </dialog>
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
