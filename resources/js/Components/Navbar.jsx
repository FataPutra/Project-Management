import { Link, useForm } from "@inertiajs/react";
import React from "react";

export default function Navbar({user})
{
    const { data, setData, post, processing, errors } = useForm({
        title: '',
    })

    function submit(e) {
        console.log(e.preventDefault())
        // e.preventDefault()
        // post('/login')
    }
    const link = [
        {
            'name' : 'Dashboard',
            'route' : 'dashboard',
            'icon' : `>`
        },
    ]
  return (
    <div className="navbar bg-blue-950 border-b-2 border-blue-950">
        <div className="flex lg:flex-none items-center">
            <div className="drawer md:hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
                        <svg
                            viewBox="0 0 1024 1024"
                            fill="white"
                            height="2em"
                            width="2em"
                            className="md:hidden"
                            >
                            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
                        </svg>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu w-72 min-h-full bg-base-200 text-base-content inline-block absolute">
                    {/* Sidebar content here */}
                    <div className="flex items-center gap-3 flex-row px-3 py-4 border-b-2">
                        {/* Button Add Project */}
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="flex justify-center gap-3 py-2 w-full text-2xl font-bold text-white bg-blue-600 rounded-md border-blue-700 hover:bg-blue-700" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                            <label>Project</label>
                            <label>+</label>
                        </button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box flex flex-col justify-center ">
                                <h3 className="font-bold text-lg pb-4 m-auto">Tambah Project</h3>

                                <form onSubmit={submit} className="flex flex-col">
                                        <input type="text" placeholder="Masukan Title Baru" className="input input-bordered w-full max-w-" value={data.title} onChange={e => setData('title', e.target.value)} />
                                        {errors.title && <div>{errors.title}</div>}

                                    <button type="submit" disabled={processing} className="btn btn-outline btn-accent mt-3">Tambah</button>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                    {link.map((item, index) => {
                        return (
                            <a href={route(item.route)}>
                                <li key={index} className="flex flex-row items-center text-xl">
                                    <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                    {item.name}
                                </li>
                            </a>

                            // <li key={index} className="flex flex-row items-center text-xl">
                            //     <a href={route(item.route)}>
                            //         <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                            //         {item.name}
                            //     </a>
                            // </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            {/* {header && (
                <a className="text-2xl font-bold text-white md:px-4">{header}</a>
            )} */}
            <div className="flex gap-3 flex-row px-6 py-4">
                <svg
                    viewBox="0 0 496 512"
                    fill="white"
                    height="2em"
                    width="2em"
                    >
                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm52.7 93c8.8-15.2 28.3-20.5 43.5-11.7 15.3 8.8 20.5 28.3 11.7 43.6-8.8 15.2-28.3 20.5-43.5 11.7-15.3-8.9-20.5-28.4-11.7-43.6zM87.4 287.9c-17.6 0-31.9-14.3-31.9-31.9 0-17.6 14.3-31.9 31.9-31.9 17.6 0 31.9 14.3 31.9 31.9 0 17.6-14.3 31.9-31.9 31.9zm28.1 3.1c22.3-17.9 22.4-51.9 0-69.9 8.6-32.8 29.1-60.7 56.5-79.1l23.7 39.6c-51.5 36.3-51.5 112.5 0 148.8L172 370c-27.4-18.3-47.8-46.3-56.5-79zm228.7 131.7c-15.3 8.8-34.7 3.6-43.5-11.7-8.8-15.3-3.6-34.8 11.7-43.6 15.2-8.8 34.7-3.6 43.5 11.7 8.8 15.3 3.6 34.8-11.7 43.6zm.3-69.5c-26.7-10.3-56.1 6.6-60.5 35-5.2 1.4-48.9 14.3-96.7-9.4l22.5-40.3c57 26.5 123.4-11.7 128.9-74.4l46.1.7c-2.3 34.5-17.3 65.5-40.3 88.4zm-5.9-105.3c-5.4-62-71.3-101.2-128.9-74.4l-22.5-40.3c47.9-23.7 91.5-10.8 96.7-9.4 4.4 28.3 33.8 45.3 60.5 35 23.1 22.9 38 53.9 40.2 88.5l-46 .6z" />
                </svg>
                <label className="text-2xl font-bold text-white">InvenEz</label>
            </div>
        </div>
        <div className="flex justify-end flex-1 ">
            <div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn text-white text-xs md:text-sm">{user.name}</label>
                    <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                        <li>
                            <a href={route("profile.edit")}>Profile</a>
                        </li>
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

;
