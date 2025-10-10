"use client";
import { useState } from "react";
import { useField } from "formik";
import { EyeIcon } from "../../svg";
import { Text } from "@radix-ui/themes";

interface IProps {
    isPassword?: boolean;
    name: string;
    type?:
    | "number"
    | "text"
    | "email"
    | "date"
    | "password"
    | "search"
    | "time"
    | "hidden"
    | "datetime-local"
    | "month"
    | "tel"
    | "url"
    | "week";
    placeholder?: string;
    disable?: boolean;
    icon?: React.ReactNode;
    hasIcon?: boolean;
    hasLeftIcon?: boolean;
    borderRadius?: string;
    textarea?: boolean;
    onclick?: () => void;
    color?: string;
    borderColor?: string;
    borderWidth?: string;
    height?: string;
    label?: string
}

export default function CustomInput({
    isPassword = false,
    name,
    textarea,
    type = "text",
    placeholder,
    disable,
    icon,
    hasIcon,
    hasLeftIcon,
    borderRadius,
    onclick,
    color,
    borderColor,
    borderWidth,
    height,
    label
}: IProps) {
    const [field, meta, helpers] = useField(name);
    const [showText, setShowText] = useState(isPassword ? "password" : type);

    const togglePassword = () =>
        setShowText((prev) => (prev === "text" ? "password" : "text"));

    const formatDate = (val: any) => {
        if (!val) return "";
        const d = new Date(val);
        return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
    };

    return (
        <div className="w-full flex flex-col gap-0.5 ">
            {label && (
                <Text className=" text-primary font-semibold text-sm " >{label}</Text>
            )}
            {textarea ? (
                <textarea
                    {...field}
                    disabled={disable}
                    placeholder={placeholder}
                    value={field.value || ""}
                    onChange={(e) => helpers.setValue(e.target.value)}
                    onBlur={() => helpers.setTouched(true)}
                    className="h-[111px] p-3 border-[#37137F] border-opacity-30 outline-none border-[2px] hover:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-medium text-primary"
                    style={{ borderRadius: borderRadius ?? "5px" }}
                />
            ) : (
                <div className="w-full h-[54px] relative">
                    <input
                        {...field}
                        type={showText}
                        disabled={disable}
                        placeholder={placeholder}
                        autoComplete="off"
                        value={
                            type === "date" ? formatDate(field.value) : field.value || ""
                        }
                        onChange={(e) => helpers.setValue(e.target.value)}
                        onBlur={() => helpers.setTouched(true)}
                        style={{
                            borderRadius: borderRadius ?? "5px",
                            color: color ?? "#37137f",
                            borderColor: borderColor ?? "#37137F80",
                            borderWidth: borderWidth ?? "2px",
                            height: height ?? "50px"
                        }}
                        className={`${hasLeftIcon ? "pl-[40px]" : ""
                            } px-3 outline-none bg-transparent w-full text-sm font-medium`}
                    />

                    {isPassword && (
                        <div
                            role="button"
                            onClick={togglePassword}
                            className={`${showText === "password" ? "" : "opacity-20"
                                } w-[30px] pr-2 h-[54px] flex justify-center items-center absolute right-0 top-0`}
                        >
                            <EyeIcon />
                        </div>
                    )}

                    {!isPassword && hasIcon && (
                        <div
                            onClick={onclick}
                            role="button"
                            className="absolute w-fit cursor-pointer right-0 top-0 pr-2"
                        >
                            <div className="w-[30px] h-[54px] flex justify-center items-center">
                                {icon}
                            </div>
                        </div>
                    )}

                    {!isPassword && hasLeftIcon && (
                        <div
                            onClick={onclick}
                            role="button"
                            className="absolute w-fit cursor-pointer left-0 top-0 pl-2"
                        >
                            <div className="w-[30px] h-[54px] flex justify-center items-center">
                                {icon}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {meta.touched && meta.error && (
                <Text className="text-left text-xs text-red-500 font-medium mt-1">
                    {meta.error}
                </Text>
            )}
        </div>
    );
}
