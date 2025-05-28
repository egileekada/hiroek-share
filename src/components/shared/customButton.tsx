import { ArrowIcon } from '../../svg';

interface IProps { 
    hasBackIcon?: boolean;
    hasFrontIcon?: boolean;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    loading?: boolean;
    bgColor?: string;
    color?: string;
    width?: string;
    height?: string;
    rounded?: string;
    fontSize?: string;
    type?: "submit" | "reset" | "button";
    borderWidth?: string;
    borderColor?: string;
    noshadow?: boolean;
    isDisabled?: boolean;
    hasIcon?: boolean;
    [x:string]: any;
}

export default function CustomButton(props: IProps) {

    const {
        hasFrontIcon,
        hasIcon,
        children,
        bgColor,
        icon,
        color,
        width,
        height,
        rounded,
        loading,
        fontSize,
        type,
        borderWidth,
        borderColor,
        noshadow,
        isDisabled,
        ...rest
    } = props

    return ( 
        <button {...rest} type={type} disabled={loading || isDisabled} style={{background: bgColor ?? "#37137f", color: color ?? "white", borderRadius: rounded ?? "8px", height: height ?? "54px", width: width ?? "100%", fontSize: fontSize ?? "14px", borderWidth: borderWidth ?? "0px", borderColor: borderColor ?? "transparent" }} className=' px-3 flex gap-2 !items-center text-white font-semibold !justify-center' >
            {(hasFrontIcon && !loading) && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
            <p className=' mt-[2px] ' >{loading ? "Loading..." : children}</p>
            {(hasIcon && !loading) && (
                <>
                    {icon ?? <ArrowIcon />}
                </>
            )}
        </button>
    )
}