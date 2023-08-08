const InputComp = (props) => {
    const { errorMessage, touched, placeholder, ...inputProps } = props
    return (
        // eski my-5
        <div className="w-full my-3">
            <label className="relative block w-full">
                <input className={`h-14 w-full border outline-none px-4 peer
                ${errorMessage && touched ? "border-red-500" : " border-primary"}`}
                    required
                    {...inputProps}
                />
                <span className="absolute top-4 left-0 px-4 text-sm  h-full peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-300 peer-valid:top-0 peer-valid:text-gray-300 peer-valid:text-xs transition-all">
                    {placeholder}
                </span>
            </label>

            {touched ? <span className="text-red-500 text-sm block mb-3">{errorMessage}</span> : ""}

        </div>

    )
}

export default InputComp


