"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import Editor from "@/components/shared/Editor";
import { useAppContext } from "@/context/AppContext";
import { FaSave } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import LocationSelect from "./LocationSelect";

const ServiceAddForm = ({ isEditMode, id }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const { setLoading, userRole } = useAppContext();

  const [providers, setProviders] = useState([]);
  const [allCategoryData, setAllCategoryData] = useState([]);
  const [allSubCategoryData, setAllSubCategoryData] = useState([]);
  const [allUpazila, setAllUpazila] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const [isSubCategoryDisabled, setIsSubCategoryDisabled] = useState(true);
  const [noSubCategoryFound, setNoSubCategoryFound] = useState(false);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);
  const [isUpazilaDisabled, setIsUpazilaDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      services: [
        { additionalService: "", servicePrice: "", serviceDuration: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });
  const [preview, setPreview] = useState("");

  const getSingleService = async () => {
    if (!isEditMode || !id) return;
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}service/getservicebyid/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const serviceData = result.data;
        if (serviceData.categoryId) {
          await getSubCategories(serviceData.categoryId);
        }

        if (serviceData.serviceLocation?.divisionId?.length > 0) {
          await getDistrictByDivision(serviceData.serviceLocation.divisionId);
        }
        if (serviceData.serviceLocation?.districtId?.length > 0) {
          await getUpazilaByDistrict(serviceData.serviceLocation.districtId);
        }

        const mappedData = {
          title: serviceData.title,
          providerId: serviceData.providerId,
          categoryId: serviceData.categoryId,
          subCategoryId: serviceData.subCategoryId,
          duration: serviceData.duration,
          price: serviceData.price,

          VideoLink: serviceData.videoLink || "",
          isActive: serviceData.isActive,
          isDefault: serviceData.isDefault,
          serviceArea: serviceData.serviceLocation?.serviceArea || "",

          metaTitle: serviceData.serviceSeo?.metaTitle || "",
          metaKeywords: serviceData.serviceSeo?.metaKeywords || "",
          metaDescription: serviceData.serviceSeo?.metaDescription || "",

          divisionId: serviceData.serviceLocation?.divisionId || [],
          districtId: serviceData.serviceLocation?.districtId || [],
          upazilaId: serviceData.serviceLocation?.upazilaId || [],

          services: serviceData.listServiceAdditional?.map((s) => ({
            additionalService: s.name,
            servicePrice: s.price.toString(),
            serviceDuration: s.duration,
          })) || [
            { additionalService: "", servicePrice: "", serviceDuration: "" },
          ],
        };

        reset(mappedData);
        setTimeout(() => {
          const decodeHTML = (html) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
          };
          setValue("description", decodeHTML(serviceData.description || ""));
        }, 100);

        if (
          serviceData.listServiceImage &&
          serviceData.listServiceImage.length > 0
        ) {
          const defaultImage =
            serviceData.listServiceImage.find((img) => img.isDefault) ||
            serviceData.listServiceImage[0];
          if (defaultImage?.imageUrl) {
            setPreview(
              `${process.env.NEXT_PUBLIC_API_ADMIN_URL}files/services/${defaultImage?.imageUrl}`
            );
          }
        }
      } else {
        toast.error("Failed to fetch service data.");
      }
    } catch (error) {
      toast.error("An error occurred while loading service data.");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getcategories`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllCategoryData(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllCategoryData([]);
      }
    } catch (error) {
      setAllCategoryData([]);
      setLoading(false);
    }
  };
  const getSubCategories = async (catId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getsubcategoriesbycategory?categoryId=${catId}`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        // setAllSubCategoryData(result?.data);

        setLoading(false);

        const data = result?.data || [];
        setAllSubCategoryData(data);

        if (data.length > 0) {
          setIsSubCategoryDisabled(false);
          setNoSubCategoryFound(false);
        } else {
          setIsSubCategoryDisabled(true);
          setNoSubCategoryFound(true);
        }
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllSubCategoryData([]);
        setIsSubCategoryDisabled(true);
        setNoSubCategoryFound(true);
      }
    } catch (error) {
      setAllSubCategoryData([]);
      setIsSubCategoryDisabled(true);
      setNoSubCategoryFound(true);
      setLoading(false);
    }
  };

  const getProviders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getproviders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setProviders(result.data);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };

  const getUpazilaByDistrict = async (districtIds = []) => {
    setAllUpazila([]);
    if (!districtIds.length || districtIds[0] === 0) {
      setIsUpazilaDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getupazilabydistrict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(districtIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch upazilas");
      const result = await response.json();
      setAllUpazila(result?.data || []);
      setIsUpazilaDisabled(false);
    } catch (error) {
      setAllUpazila([]);
      setIsUpazilaDisabled(true);
    } finally {
      setLoading(false);
    }
  };

  const getDistrictByDivision = async (divisionIds = []) => {
    setAllDistrict([]);
    setAllUpazila([]);
    setValue("districtId", "");
    setValue("upazilaId", "");
    setIsUpazilaDisabled(true);

    if (!divisionIds.length || divisionIds[0] === 0) {
      setIsDistrictDisabled(true);
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdistrictbydivision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
          body: JSON.stringify(divisionIds),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch districts");
      const result = await response.json();

      setAllDistrict(result?.data || []);
      setIsDistrictDisabled(false);
    } catch (error) {
      setIsDistrictDisabled(true);
      setAllDistrict([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllDivision = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ADMIN_URL}dropdown/getdivisions`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setAllDivision(result?.data);
        setLoading(false);
      } else {
        const errorData = await response.json();
        setLoading(false);
        setAllDivision([]);
      }
    } catch (error) {
      setAllDivision([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProviders();
    getCategories();
    getAllDivision();
    if (isEditMode && id) {
      getSingleService();
    }
  }, [isEditMode, id]);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "categoryId" && value.categoryId && !isEditMode) {
        const selected = Number(value.categoryId);
        if (selected) {
          getSubCategories(selected);
        } else {
          setAllSubCategoryData([]);
          setIsSubCategoryDisabled(true);
          setNoSubCategoryFound(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isEditMode]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      const serviceJson = {
        title: data.title,
        providerId: data.providerId,
        categoryId: Number(data.categoryId),
        subCategoryId: Number(data.subCategoryId),
        duration: data.duration,
        description: data.description,
        price: parseFloat(data.price),
        VideoLink: data.VideoLink,
        isActive: data.isActive,
        isDefault: data.isDefault,
        listServiceAdditional: data.services.map((s) => ({
          name: s.additionalService,
          price: parseFloat(s.servicePrice),
          duration: s.serviceDuration,
        })),

        serviceLocation: {
          divisionId: Array.isArray(data.divisionId)
            ? data.divisionId.map(Number)
            : [],
          districtId: Array.isArray(data.districtId)
            ? data.districtId.map(Number)
            : [],
          upazilaId: Array.isArray(data.upazilaId)
            ? data.upazilaId.map(Number)
            : [],
          serviceArea: data.serviceArea,
        },
        serviceSeo: {
          metaTitle: data.metaTitle,
          metaKeywords: data.metaKeywords,
          metaDescription: data.metaDescription,
        },
      };
      if (isEditMode) {
        serviceJson.Id = parseFloat(id);
      }

      formData.append("serviceJson", JSON.stringify(serviceJson));

      if (data.serviceImages && data.serviceImages.length > 0) {
        for (const img of data.serviceImages) {
          formData.append("serviceImages", img);
        }
      }

      formData.append("defaultImageIndex", isEditMode ? "0" : "1");

      const endpoint = isEditMode
        ? `${process.env.NEXT_PUBLIC_API_ADMIN_URL}service/update/${id}`
        : `${process.env.NEXT_PUBLIC_API_ADMIN_URL}service/create`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        if (result.message) {
          toast.success(result.message);
          router.push("/admin/services");
        } else {
          toast.error(result.error);
        }
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBFBFB] ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          <div
            className={`mb-6 grid  ${
              userRole === "Admin" ? "lg:grid-cols-3" : "lg:grid-cols-2"
            } gap-6`}
          >
            {userRole === "Admin" && (
              <div className="">
                <label className="block text-sm  text-gray-800">Provider</label>
                <select
                  id="providerId"
                  {...register("providerId", {
                    required: !isEditMode && "Provider is required",
                  })}
                  className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
                >
                  <option value="" className="">
                    Select a provider
                  </option>
                  {providers?.map((item) => (
                    <option key={item.id} value={item.id} className="">
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.providerId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.providerId.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm  text-gray-800">
                Title
              </label>
              <input
                id="title"
                {...register("title", {
                  required: !isEditMode && "Title is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="subCategoryId"
                className="block text-sm  text-gray-800"
              >
                Service Status
              </label>
              <select
                id="serviceStatus"
                {...register("serviceStatus", {
                  required: !isEditMode && "Sub Category is required",
                })}
                className={`mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none `}
              >
                <option value="">Please Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.serviceStatus && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceStatus.message}
                </p>
              )}
            </div>
          </div>
          {/* Category */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="categoryId"
                className="block text-sm  text-gray-800"
              >
                Category
              </label>
              <select
                id="categoryId"
                {...register("categoryId", {
                  required: !isEditMode && "Category is required",
                })}
                onChange={(e) => {
                  const selected = Number(e.target.value);
                  setValue("categoryId", selected);
                  setValue("subCategoryId", "");
                  if (selected) {
                    getSubCategories(selected);
                  } else {
                    setAllSubCategoryData([]);
                    setIsSubCategoryDisabled(true);
                    setNoSubCategoryFound(false);
                  }
                }}
                className="mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none "
              >
                <option value="" className="">
                  Select Category
                </option>
                {allCategoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            {/* sub category Title */}
            <div>
              <label
                htmlFor="subCategoryId"
                className="block text-sm  text-gray-800"
              >
                Sub Category
              </label>
              <select
                id="subCategoryId"
                {...register("subCategoryId", {
                  required: !isEditMode && "Sub Category is required",
                })}
                disabled={isSubCategoryDisabled}
                className={`mt-1 block w-full rounded-md text-gray-600 text-sm border border-gray-300 px-4 py-3 focus:outline-none ${
                  isSubCategoryDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">
                  {noSubCategoryFound
                    ? "No Sub Category Found"
                    : "Please Select Sub Category"}
                </option>
                {allSubCategoryData.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {errors.subCategoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.subCategoryId.message}
                </p>
              )}
            </div>
          </div>
          {/*  */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm  text-gray-800"
              >
                Duration
              </label>
              <input
                id="duration"
                {...register("duration", {
                  required: !isEditMode && "Duration is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* price */}
            <div>
              <div className="flex justify-between gap-3 items-center">
                <label htmlFor="price" className="block text-sm  text-gray-800">
                  Price
                </label>
                <div className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    {...register("isStartPrice")}
                    className="toggle toggle-success "
                  />
                  <label className=" text-sm  text-gray-800">Start Price</label>
                </div>
              </div>

              <input
                id="price"
                {...register("price", {
                  required: !isEditMode && "Price is required",
                })}
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm  text-gray-800 mb-1"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Editor value={field.value} onChange={field.onChange} />
              )}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        {/* service */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Service Information</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid lg:grid-cols-3 gap-6 mb-6 relative"
            >
              {/* list Service Additional */}
              <div>
                {/* name */}
                <label
                  htmlFor={`services[${index}].additionalService`}
                  className="block text-sm text-gray-800"
                >
                  Additional Service
                </label>
                <input
                  id={`services[${index}].additionalService`}
                  {...register(`services.${index}.additionalService`, {
                    required: "Additional Service is required",
                  })}
                  placeholder="Enter service"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.additionalService
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.additionalService && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].additionalService.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor={`services[${index}].servicePrice`}
                  className="block text-sm text-gray-800"
                >
                  Price
                </label>
                <input
                  id={`services[${index}].servicePrice`}
                  {...register(`services.${index}.servicePrice`, {
                    required: "Service Price is required",
                  })}
                  placeholder="Enter price"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.servicePrice
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.servicePrice && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].servicePrice.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor={`services[${index}].serviceDuration`}
                  className="block text-sm text-gray-800"
                >
                  Service Duration
                </label>
                <input
                  id={`services[${index}].serviceDuration`}
                  {...register(`services.${index}.serviceDuration`, {
                    required: "Service Duration is required",
                  })}
                  placeholder="Enter duration"
                  className={`mt-1 block text-gray-800 w-full rounded-md border px-4 py-2 focus:outline-none ${
                    errors?.services?.[index]?.serviceDuration
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors?.services?.[index]?.serviceDuration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.services[index].serviceDuration.message}
                  </p>
                )}
              </div>

              {/* Remove button */}
              {index === 0 ? (
                " "
              ) : (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2  text-gray-800 rounded-full w-6 h-6 flex items-center justify-center"
                >
                  <FaRegTrashCan />
                </button>
              )}
            </div>
          ))}

          <button
            className="flex items-center gap-1 text-sm"
            type="button"
            onClick={() =>
              append({
                additionalService: "",
                servicePrice: "",
                serviceDuration: "",
              })
            }
          >
            <span className="bg-(--primary-blue) text-white p-1 h-5 w-5 rounded-full flex items-center justify-center ">
              +
            </span>{" "}
            <span className="text-(--primary-blue) font-semibold">
              Add Additional Service
            </span>
          </button>
        </div>
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Video</h6>
          <div className="border-b border-gray-200/80 my-6"></div>

          {/* video */}
          <div>
            <label htmlFor="VideoLink" className="block text-sm  text-gray-800">
              Video Link
            </label>
            <input
              id="VideoLink"
              {...register("VideoLink")}
              placeholder="https://example.com"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.VideoLink ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
        </div>
        {/* location */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Location</h6>
          <div className="border-b border-gray-200/80 my-6"></div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* serviceArea */}
            <div>
              <label htmlFor="price" className="block text-sm  text-gray-800">
                Service Area
              </label>
              <input
                id="serviceArea"
                {...register("serviceArea", {
                  required: !isEditMode && "Service Area is required",
                })}
                placeholder="Enter your service area"
                className={`mt-1 block text-gray-800 w-full rounded-md border focus:outline-none ${
                  errors.serviceArea ? "border-red-500" : "border-gray-300"
                } px-4 py-2 `}
              />
              {errors.serviceArea && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceArea.message}
                </p>
              )}
            </div>

            <LocationSelect
              allDivision={allDivision}
              allDistrict={allDistrict}
              allUpazila={allUpazila}
              getDistrictByDivision={getDistrictByDivision}
              getUpazilaByDistrict={getUpazilaByDistrict}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>

        {/* Gallery */}

        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>Gallery</h6>
          <div className="border-b border-gray-200/80 my-6"></div>
          {/* Upload */}
          <div className="">
            <button
              type="button"
              onClick={() => fileInputRef?.current?.click()}
              className="px-3 py-5 bg-gray-50 block w-full border-gray-300 border border-dashed rounded-md text-sm flex justify-center"
            >
              <IoCloudUploadOutline
                size={50}
                className="block w-full text-gray-600"
              />
            </button>
          </div>
          {preview && (
            <div className="relative my-5 inline-block">
              <img
                src={preview}
                alt="preview"
                className="w-20 h-20  object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setValue("serviceImages", null);
                }}
                className=" text-white bg-red-500 p-1 rounded m-1 absolute top-0 right-0 z-20"
              >
                <FaRegTrashCan />
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            ref={(el) => {
              fileInputRef.current = el;
              register("serviceImages");
            }}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setPreview(URL.createObjectURL(files[0]));
              setValue("serviceImages", files, { shouldValidate: true });
            }}
            className="hidden"
          />

          {errors.serviceImages && (
            <p className="text-red-500 text-xs mt-1">
              {errors.serviceImages.message}
            </p>
          )}
        </div>
        {/*  */}
        <div className=" rounded-md p-4 mt-8 bg-white ">
          <h6>SEO</h6>
          <div className="border-b border-gray-200/80 my-6"></div> {/* Seo */}
          <div className="mb-6">
            <label htmlFor="videoLink" className="block text-sm  text-gray-800">
              Meta Title (English)
            </label>
            <input
              id="metaTitle"
              {...register("metaTitle")}
              placeholder="Enter meta title"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaTitle ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="metaKeywords"
              className="block text-sm  text-gray-800"
            >
              Meta Keywords (English)
            </label>
            <input
              id="metaKeywords"
              {...register("metaKeywords")}
              placeholder="Enter  meta Keywords"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaKeywords ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm  text-gray-800"
            >
              Meta Description (English)
            </label>
            <input
              id="metaDescription"
              {...register("metaDescription")}
              placeholder="Enter description"
              className={`mt-1 placeholder:text-sm  block text-gray-800 w-full rounded-md border focus:outline-none ${
                errors.metaDescription ? "border-red-500" : "border-gray-300"
              } px-4 py-2 `}
            />
          </div>
        </div>
        <div className="flex items-center gap-6 ps-4">
          {userRole === "Admin" && (
            <div className="flex items-center gap-2 ">
              <input
                type="checkbox"
                {...register("isDefault")}
                className="toggle toggle-success "
              />
              <label className="text-sm font-medium text-gray-600">
                Is Default
              </label>
            </div>
          )}

          <div className="flex items-center gap-2 ">
            {/* <input
              type="checkbox"
              {...register("isActive")}
              className="toggle toggle-success "
            />
            <label className="text-sm font-medium text-gray-600">
              Is Active
            </label> */}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end mb-5">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-(--primary-blue) to-blue-600 text-white  rounded-md hover:shadow-lg transition-all duration-200 :opacity-50"
          >
            <FaSave />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceAddForm;
