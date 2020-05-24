import {
  ClipboardCheck,
  Lightbulb,
  Magnify,
  Settings,
  Trophy,
  UnfoldMoreVertical,
} from "mdi-material-ui/light/index.es";
import React from "react";
import ContactForm from "../components/ContactForm";
import IconsGallery from "../components/IconsGallery";
import ImagesGallery from "../components/ImagesGallery";
import Skills from "../components/Skills";
import WideImage from "../components/WideImage";

export const buildComponent = component => {
  const data = JSON.parse(component.data);
  switch (component.type) {
    case "ICONS":
      return (
        <IconsGallery
          key={component.id}
          title={component.title}
          items={data.items}
        />
      );
    case "WIDE_IMAGE":
      return (
        <WideImage key={component.id} title={component.title} src={data.src} />
      );
    case "GALLERY":
      return <ImagesGallery key={component.id} items={data.items} />;
    case "SKILLS":
      return (
        <Skills key={component.id} title={component.title} items={data.items} />
      );
    case "CONTACT_FORM":
      return (
        <ContactForm
          key={component.id}
          title={component.title}
          latitude={data.latitude}
          longitude={data.longitude}
        />
      );
    default:
      console.warn("Unsupported component", component);
  }
};

export const buildIcon = iconType => {
  switch (iconType) {
    case "magnify":
      return <Magnify style={{ fontSize: 80 }} />;
    case "lightbulb":
      return <Lightbulb style={{ fontSize: 80 }} />;
    case "clipboardCheck":
      return <ClipboardCheck style={{ fontSize: 80 }} />;
    case "settings":
      return <Settings style={{ fontSize: 80 }} />;
    case "unfoldMoreVertical":
      return <UnfoldMoreVertical style={{ fontSize: 80 }} />;
    case "trophy":
      return <Trophy style={{ fontSize: 80 }} />;
    default:
      console.warn(`Unsupported icon: ${iconType}`);
  }
};
