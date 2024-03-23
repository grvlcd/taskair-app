import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useBoardStore from "@/lib/store/boards/boardStore";
import { NextComponentType } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const BoardSchema = z.object({
  name: z.string().min(8),
  description: z.string().max(255),
});

type TBoard = z.infer<typeof BoardSchema>;

const BoardModal: NextComponentType = () => {
  const { modal, toggle } = useBoardStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBoard>({
    resolver: zodResolver(BoardSchema),
  });

  const onSubmit = async (data: TBoard) => {
    console.log(data);
  };

  const handleClose = () => {
    toggle(false);
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create new Board
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                      <div className="w-full">
                        <label
                          className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Board Name
                        </label>
                        <input
                          {...register("name")}
                          className={`appearance-none block w-full bg-gray-200 ${
                            errors.name && "border-red-500"
                          } text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                          id="grid-first-name"
                          type="text"
                          placeholder="Awesome Board"
                        />
                        <div className="h-4">
                          {errors.name && (
                            <p className="text-red-500 text-xs italic">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          className={`appearance-none block w-full bg-gray-200 ${
                            errors.description && "border-red-500"
                          } text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                          id="grid-first-name"
                          cols={40}
                          rows={10}
                        ></textarea>
                        <div className="h-4">
                          {errors.description && (
                            <p className="text-red-500 text-xs italic">
                              {errors.description?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-end mt-4 space-x-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BoardModal;
