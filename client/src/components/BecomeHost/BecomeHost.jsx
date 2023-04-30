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
const BecomeHost = () => {
  const formRef = useRef(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState([]);
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

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

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
      setPreviewImg(url);
    };

    getCarImage();
  }, [selectedModel]);

  // SUBMIT FORM
  const submitFormHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formMap = {};
    for (let [name, value] of formData.entries()) {
      formMap[name] = value;
    }

    const { response, err } = await carApi.createCar({
      userId: "644d2ae97a0a9e29c512add0",
      images: [previewImg],
      hourlyPrice: 200,
      fuelType: selectedFuelType,
      color: selectedColor,
      transmission: selectedTransmission,
      seats: selectedSeats,
      year: selectedYear,
      make: selectedMake,
      model: selectedModel,
      bodyType: selectedBodyType,
      rating: 3.5,
      carLocation: carLocation,
      ...formMap,
    });

    if (err) {
      toast.error(err.message);
    }
    if (response) {
      console.log(response);
      formRef.current.reset();
    }
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
                  <input type="text" name="rent" />
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
                />
                <SearchTextField
                  title="Make"
                  items={makes}
                  onChange={onMakeChange}
                  placeholder="Make"
                />
                <SearchTextField
                  title="Model"
                  items={models}
                  onChange={onModelChange}
                  placeholder="Model"
                />
                <SearchTextField
                  title="Transmission"
                  items={transmissions}
                  onChange={onTransmissonChange}
                  placeholder="Transmission"
                />
                <SearchTextField
                  title="Fuel Type"
                  items={fuelTypes}
                  onChange={onFuelTypeChange}
                  placeholder="Fuel Type"
                />
                <SearchTextField
                  title="No of Seats"
                  items={noOfSeats}
                  onChange={onSeatsChange}
                  placeholder="No of Seats"
                />
                <SearchTextField
                  title="Color"
                  items={colors}
                  onChange={onColorChange}
                  placeholder="Color"
                />
                <SearchTextField
                  title="Body"
                  items={bodyTypes}
                  onChange={onBodyTypeChange}
                  placeholder="Body Type"
                />
              </div>
              {previewImg && (
                <img src={previewImg} className="previewImg" alt="car-img" />
              )}
              <button onClick={submitFormHandler} className="btn">
                Submit Form
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
