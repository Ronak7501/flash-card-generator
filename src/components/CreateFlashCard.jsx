import React, { useContext } from "react";
import { useState } from "react";
import FlashCardContext from "../context/FormContext.jsx";

const CreateFlashCard = () => {
  const { addFlashCardData } = useContext(FlashCardContext);

  const [flashCardForm, setFlashCardForm] = useState({
    group: "",
    description: "",
  });

  const [addSubform, setAddSubform] = useState([
    { id: 1, term: "", definition: "" },
  ]);

  const handleAddMore = () => {
    // Add a new empty subform
    setAddSubform([
      ...addSubform,
      { id: addSubform.length + 1, term: "", definition: "" },
    ]);
  };

  const handleDelete = (id) => {
    if (addSubform.length > 1) {
      const updatedFormList = addSubform.filter((obj) => obj.id !== id);

      const rearrangedForm = updatedFormList.map((form, index) => ({
        ...form,
        id: index + 1,
      }));
      setAddSubform(rearrangedForm);
    }
  };

  const handleFlashCardChange = (e) => {
    setFlashCardForm({ ...flashCardForm, [e.target.name]: e.target.value });
  };

  const handleFormChange = (e, id) => {
    // e.preventDefault();
    const { name, value } = e.target;

    const updateForms = addSubform.map((form) =>
      form.id === id ? { ...form, [name]: value } : form
    );
    setAddSubform(updateForms);
    console.log(updateForms);
  };

  const handleCreateClick = (e) => {
    // e.preventDeafault();

    addFlashCardData(flashCardForm, addSubform);

    // console.log(`FlasCard Form : ${JSON.stringify(flashCardForm)}`);
    // console.log(`Sub Form :  ${JSON.stringify(addSubform)}`);

    setFlashCardForm({ group: "", description: "" });
    setAddSubform([{ id: 1, term: "", definition: "" }]);
  };

  const handleFlashCardFormChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFlashCardForm((prevform) => ({
          ...prevform,
          image: reader.result,
        }));
        console.log(reader.result);
      };

      reader.readAsDataURL(file);
    }

    console.log(addSubform);
  };

  const handleSubformImageChange = (e, id) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAddSubform((prevForm) => {
          const updatedForms = prevForm.map((form) =>
            form.id === id ? { ...form, image: reader.result } : form
          );
          return updatedForms;
        });
      };
      reader.readAsDataURL(file);
    }

    console.log(addSubform);
  };

  return (
    <>
      <div className=" bg-white shadow-md mt-6 pb-6 flex flex-wrap">
        <form className="m-4 w-full" action="">
          <div className="label pt-4 px-8 ">
            <label className="text-gray-400 text-sm font-semibold" htmlFor="">
              Create Group *
            </label>
          </div>
          <div className="fields flex flex-wrap gap-3 my-2 px-7  ">
            <input
              className="pl-2 text-sm rounded border-2 border-gray-300 shadow-sm w-full lg:w-[40%]  h-8"
              type="text"
              name="group"
              value={flashCardForm.group}
              onChange={handleFlashCardChange}
            />
            <div className="flex  w-[92%] sm:w-[60%] lg:w-[40%]">
              <label
                htmlFor="file-upload"
                className="flex justify-center items-center cursor-pointer border-2 border-blue-600 p-4 h-8 text-sm text-blue-600 font-semibold rounded-md w-[80%] hover:bg-blue-600 hover:text-white hover:shadow-gray-500 hover:shadow-sm"
              >
                Upload Image
              </label>
              <span className="ml-6 text-sm font-semibold text-gray-400"></span>
              <input
                className="w-full sm:w-[40%] hidden"
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleFlashCardFormChange(e)}
              />
            </div>
          </div>
          <div className="label pt-8 sm:pt-4  px-7 ">
            <label className="text-gray-400 text-sm font-semibold " htmlFor="">
              Add Description
            </label>
            <div className="textbox my-2">
              <textarea
                className="pl-2 text-sm rounded border-2 border-gray-300 shadow-sm h-[17vh] w-full lg:w-[60%] p-2"
                name="description"
                value={flashCardForm.description}
                onChange={handleFlashCardChange}
              ></textarea>
            </div>
          </div>
        </form>
      </div>

      <div className=" bg-white shadow-md mt-6 pb-4 flex flex-wrap">
        <form className="m-4 w-full " action="">
          <div className="m-6  ">
            {addSubform.map((form) => {
              return (
                <div
                  key={form.id}
                  className=" flex flex-wrap lg:flex-nowrap justify-between gap-8  mt-8"
                >
                  <div className="flex  increment-circle pl-2 text-white rounded-xl w-[25px] h-[25px] lg:w-[30px] lg:h-[25px] bg-red-500">
                    {form.id}
                  </div>
                  {/* enter term */}

                  <div className="flex flex-col gap-2 w-full lg:justify-start lg:w-[40%] ">
                    <div className="text-gray-400 text-sm font-semibold">
                      Enter Term *
                    </div>
                    <div className="pr-7 sm:p-0">
                      <input
                        className="pl-2 text-sm rounded border-2 border-gray-300 shadow-sm h-8 w-full"
                        type="text"
                        name="term"
                        value={form.term}
                        onChange={(e) => handleFormChange(e, form.id)}
                      />
                    </div>
                  </div>

                  {/* definition */}
                  <div className="flex flex-col gap-2 w-full lg:justify-start lg:w-[40%]">
                    <div className="text-gray-400 text-sm font-semibold">
                      Enter Definition *
                    </div>
                    <div className="pr-7 sm:p-0 ">
                      <input
                        className="pl-2 text-sm rounded border-2 border-gray-300 shadow-sm h-8 w-full  "
                        type="text"
                        name="definition"
                        value={form.definition}
                        onChange={(e) => handleFormChange(e, form.id)}
                      />
                    </div>
                  </div>

                  {/* image */}
                  <div className=" image flex justify-start md:items-center w-[90%] lg:w-[50%] xl:w-[25%] ">
                    <label
                      htmlFor={`file-input-${form.id}`}
                      className="flex justify-center items-center cursor-pointer border-2 border-blue-600 p-4 h-8 text-sm text-blue-600 font-semibold rounded-md w-[80%] hover:bg-blue-600 hover:text-white hover:shadow-gray-500 hover:shadow-sm"
                    >
                      Select Image
                    </label>

                    <input
                      className="hidden w-full "
                      id={`file-input-${form.id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSubformImageChange(e, form.id)}
                    />

                    {/* <img
                      src=""
                      className="ml-4 w-28 h-24 object-cover rounded"
                      alt=""
                      srcset=""
                    /> */}
                  </div>

                  <div className="flex  md:flex-col gap-2 cursor-pointer ">
                    <div
                      className="flex justify-center cursor-pointer bg-red-600 rounded-md p-2 "
                      onClick={() => handleDelete(form.id)}
                    >
                      delete
                    </div>
                    <div className="flex justify-center cursor-pointer bg-blue-400 rounded-md p-2">
                      edit
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="w-[80%] m-auto  flex text-sm md:justify-start font-bold  pt-8 justify-center  text-blue-500 ">
              <div onClick={handleAddMore} className="cursor-pointer">
                + Add more
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="button w-full m-auto mt-5 flex justify-center items-center">
        <button
          className="bg-red-700 h-10 px-14 text-sm font-semibold text-white py-2 rounded"
          onClick={(e) => handleCreateClick(e)}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateFlashCard;
