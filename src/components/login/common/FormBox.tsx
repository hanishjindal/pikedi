import Divider from '@/components/common/Divider';
import Input from '@/components/common/Input';
import React from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { fieldType, roleType } from '../../utils'

interface FormBoxProps {
    back: () => void;
    WhoIsLogin: roleType;
    heading: string;
    handleResetFocus: () => void;
    handleInput: (field: fieldType, value: string) => void;
    handleFieldClick: (field: fieldType) => void;
    isSubmitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: any;
}

const FormBox: React.FC<FormBoxProps> = ({
    back,
    WhoIsLogin,
    heading,
    handleResetFocus,
    handleInput,
    handleFieldClick,
    isSubmitting,
    handleSubmit,
    formData
}) => {

    return (
        <div
            className="py-20 px-7 shadow-lg flex justify-center items-center gap-6 lg:gap-8 w-full lg:w-[50%] h-[60%] lg:h-full rounded-lg bg-white relative flex-col"
            onClick={handleResetFocus}
        >
            <BsArrowLeftCircleFill
                className="w-8 cursor-pointer absolute top-5 left-5"
                onClick={back}
                size={30}
            />

            <h1 className="text-2xl lg:text-4xl font-semibold">
                {heading} <span className="whitespace-nowrap">&#40;As <span className="text-theme">{WhoIsLogin}</span>&#41;</span>
            </h1>

            <form className="border rounded-xl w-full lg:w-1/2" onSubmit={handleSubmit}>
                {
                    Object.keys(formData)?.map((field, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Input
                                    name={formData[field].label}
                                    setName={(val) => handleFieldClick(formData[field].name)}
                                    label={formData[field].labelText}
                                    inputValue={formData[field].value}
                                    nameRef={formData[field].ref ?? null}
                                    setInputValue={(val) => handleInput(formData[field].name, val)}
                                    fieldRequired={true}
                                    fieldType={formData[field].type}
                                    isSubmitting={isSubmitting}
                                    placeholder={formData[field].placeholder}
                                    fieldClick={(e) => {
                                        e.stopPropagation();
                                        handleFieldClick(formData[field].name);
                                    }}
                                />

                                {index < Object.keys(formData).length - 1 && <Divider type="toe" />}
                            </React.Fragment>
                        )
                    })
                }
            </form>
        </div>
    );
};

export default FormBox;
