import { React, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import "./BecomeHost.css";
import Circle from "../Circle";
import FilePicker from "../FilePicker";
import {
  cities,
  years,
  colors,
  transmissions,
  fuelTypes,
  noOfSeats,
  bodyTypes,
} from "../../consts/appData";
import SearchTextField from "../SearchTextField";
import carInfoApi from "../../api/modules/car_info.api";
import carApi from "../../api/modules/car.api";
import { useAuth } from "../../context/AuthContext";
import userApi from "../../api/modules/user.api";

const BecomeHost = () => {
  const { uploadPhoto, getMongoUser } = useAuth();
  const formRef = useRef(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState([]);
  const [makes, setMakes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [models, setModels] = useState([]);
  const [pucCertificate, setPucCertificate] = useState([]);
  const [carImages, setCarImages] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [carLocation, setCarLocation] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const onLocationSelect = (city) => {
    setCarLocation(city);
  };
  const onYearChange = (year) => {
    setSelectedYear(year);
  };
  const onMakeChange = (make) => {
    setSelectedMake(make);
  };
  const onModelChange = (model) => {
    setSelectedModel(model);
  };
  const onColorChange = (color) => {
    setSelectedColor(color);
  };
  const onTransmissonChange = (transmission) => {
    setSelectedTransmission(transmission);
  };
  const onFuelTypeChange = (fuel) => {
    setSelectedFuelType(fuel);
  };
  const onSeatsChange = (seats) => {
    setSelectedSeats(seats);
  };
  const onBodyTypeChange = (body) => {
    setSelectedBodyType(body);
  };

  // Get Models
  useEffect(() => {
    const getModels = async () => {
      if (selectedYear == null) return;
      const { response, err } = await carInfoApi.getModels({
        year: selectedYear,
        make: selectedMake.toLowerCase(),
      });

      if (err) {
        toast.error("Failed to Fetch Models");
      }
      if (response) {
        const models = response["Models"].map((el) => el.model_name);
        setModels(models);
      }
    };

    getModels();
  }, [selectedMake]);

  // Get Makes
  const getMakes = async () => {
    if (selectedYear == null) return;
    const { response, err } = await carInfoApi.getMakes({
      year: selectedYear,
    });

    if (err) {
      toast.error("Failed to Fetch Makes");
    }
    if (response) {
      const makes = response["Makes"].map((el) => el.make_display);
      setMakes(makes);
    }
  };
  useEffect(() => {
    getMakes();
  }, [selectedYear]);

  // Get Car Image
  useEffect(() => {
    const getCarImage = async () => {
      if (selectedModel == null) return;
      const url = carInfoApi.getImage({
        make: selectedMake.toLowerCase(),
        model: selectedModel.toLowerCase(),
        year: selectedYear,
      });
      // setPreviewImg(url);
      setPreviewImg("https://media.istockphoto.com/id/468686480/photo/modern-generic-car-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=g1yrjmmaNZQ6IL9SRSh3SDgfnRihTRKqIYQmzd-8_ws=");
    };

    getCarImage();
  }, [selectedModel]);

  // Clear DATA
  const clearData = () => {
    formRef.current.reset();
    setCarImages([]);
    setInsuranceCertificate([]);
    setPucCertificate([]);
    setModels([]);
    setMakes([]);
    setPreviewImg(null);
    setCarLocation(null);
    setSelectedYear(null);
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedColor(null);
    setSelectedTransmission(null);
    setSelectedFuelType(null);
    setSelectedSeats(null);
    setSelectedBodyType(null);
  };
  // SUBMIT FORM
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(formRef.current);
    const formMap = {};
    for (let [name, value] of formData.entries()) {
      formMap[name] = value;
    }

    // Get User
    const user = await getMongoUser();
    if (user.length == 0) {
      toast.error("User not logged In.");
      return;
    }

    const carImgUrls = [];
    if (previewImg) {
      carImgUrls.push(previewImg);
    }
    try {
      await Promise.all(
        carImages.map(async (carImg) => {
          const photoUrl = await uploadPhoto(carImg, "carPhoto");
          carImgUrls.push(photoUrl);
        })
      );
    } catch (err) {
      toast.error("Failed to Upload Images!");
      return;
    }
    const rating = (Math.random() * 2.5 + 2.5).toFixed(1);

    const { response, err } = await carApi.createCar({
      userId: user[0]._id,
      images: carImgUrls,
      fuelType: selectedFuelType,
      color: selectedColor,
      transmission: selectedTransmission,
      seats: selectedSeats,
      year: selectedYear,
      make: selectedMake,
      model: selectedModel,
      bodyType: selectedBodyType,
      rating: rating,
      carLocation: carLocation,
      ...formMap,
    });

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      const userCars = user[0].cars.map((el) => el._id);
      userCars.push(response.data._id);
      await userApi.updateUser({
        fields: { cars: userCars },
        userId: user[0]._id,
      });
      toast.success("Your Car is Now Registered.");
      clearData();
    }
    setIsLoading(false);
  };

  return (
    <div className="becomeHostContainer">
      <div className="becomeHostWrapper">
        <div className="becomeHostWrapper1">
          <div className="becomeHostForm">
            <h1>Become a Host</h1>
            <form ref={formRef}>
              <div className="grid">
                <div className="gridItem">
                  <span>CAR LOCATION</span>
                  <SearchTextField
                    title="Cities"
                    items={cities.map((el) => el.cityName)}
                    onChange={onLocationSelect}
                    className="carLocation"
                    name="carLocation"
                  />
                </div>
                <div className="gridItem">
                  <span>UPI ID</span>
                  <input type="text" name="upi" />
                </div>
                <div className="gridItem">
                  <span>CAR NUMBER</span>
                  <input type="text" name="carNo" />
                </div>
                <div className="gridItem">
                  <span>RC Reg. NUMBER</span>
                  <input type="text" name="rcNo" />
                </div>
                <div className="gridItem">
                  <span>CHASSIS NUMBER</span>
                  <input type="text" name="chassisNo" />
                </div>
                <div className="gridItem">
                  <span>RENT/Hour (Rs)</span>
                  <input type="text" name="hourlyPrice" />
                </div>
              </div>
              <FilePicker
                files={insuranceCertificate}
                setFiles={setInsuranceCertificate}
                label="INSURANCE CERTIFICATE"
                maxFiles={1}
              />
              <FilePicker
                files={pucCertificate}
                setFiles={setPucCertificate}
                label="PUC CERTIFICATE"
                maxFiles={1}
              />
              <FilePicker
                files={carImages}
                setFiles={setCarImages}
                description="You can only upload upto 5 images. Supported Format is .png and .jpeg"
                label="IMAGES OF YOUR CAR"
                maxFiles={5}
              />
              <span>SELECT YOUR CAR</span>
              <div className="carSelection">
                <SearchTextField
                  title="Year"
                  items={years}
                  onChange={onYearChange}
                  placeholder="Year"
                  name="year"
                />
                <SearchTextField
                  title="Make"
                  items={makes}
                  onChange={onMakeChange}
                  placeholder="Make"
                  name="make"
                />
                <SearchTextField
                  title="Model"
                  items={models}
                  onChange={onModelChange}
                  placeholder="Model"
                  name="model"
                />
                <SearchTextField
                  title="Transmission"
                  items={transmissions}
                  onChange={onTransmissonChange}
                  placeholder="Transmission"
                  name="transmission"
                />
                <SearchTextField
                  title="Fuel Type"
                  items={fuelTypes}
                  onChange={onFuelTypeChange}
                  placeholder="Fuel Type"
                  name="fuelType"
                />
                <SearchTextField
                  title="No of Seats"
                  items={noOfSeats}
                  onChange={onSeatsChange}
                  placeholder="No of Seats"
                  name="seats"
                />
                <SearchTextField
                  title="Color"
                  items={colors}
                  onChange={onColorChange}
                  placeholder="Color"
                  name="color"
                />
                <SearchTextField
                  title="Body"
                  items={bodyTypes}
                  onChange={onBodyTypeChange}
                  placeholder="Body Type"
                  name="bodyType"
                />
              </div>
              {previewImg && (
                <img src={previewImg} className="previewImg" alt="car-img" />
              )}
              <button onClick={submitFormHandler} className="btn">
                {isLoading ? "Loading..." : "Submit Form"}
              </button>
            </form>
          </div>
        </div>

        <Circle
          className="circle1"
          top="0vh"
          left="-100vh"
          backgroundColor="#FEB06Eff"
        />
        <Circle
          className="circle2"
          top="-100vh"
          right="-20vh"
          backgroundColor="#FEB06Eff"
        />
      </div>
    </div>
  );
};

export default BecomeHost;
