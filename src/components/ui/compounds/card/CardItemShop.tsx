import { FC } from "react";
import Image from "../../atoms/Image";
import Paragraph from "../../atoms/text/Paragraph";
import { FaStar } from "react-icons/fa";
import Button from "../../atoms/Button";
import { BsCartFill } from "react-icons/bs";

interface CardItemShopProps {
    price: number;
    name: string;
    description: string;
    starts: number;
    image: string;
    images?: string[];
}

const CardItemShop: FC<CardItemShopProps> = ({ description, image, name, starts }) => {

    return (
        <div className="">
            <Image alt={name} h={20} w={20} customClass="w-full h-[150px] object-cover rounded-t-xl" src={image} />
            <div className="border border-base-content rounded-b-lg px-3 py-1">
                <div className="flex justify-between items-center">
                    <strong className="text-white">{name}</strong>
                    <strong className="text-white flex items-center gap-1">{starts} <i className="text-warning"><FaStar /></i></strong>
                </div>
                <Paragraph text={description} customClass="text-xs" />
                <div className="flex justify-end items-center">
                    <Button
                        color="info"
                        customClass=""
                        ico={<BsCartFill />}
                        text="adquirir"
                    />
                </div>
            </div>
        </div>
    )
}

export default CardItemShop;
