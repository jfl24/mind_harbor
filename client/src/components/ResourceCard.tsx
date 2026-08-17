import { useState, type ReactNode } from "react";
import {
  type ResourceType,
  type ResourceCategory,
} from "../../../shared/types";
import "./ResourceCard.css";

interface ResourceCardProps {
  titre?: string;
  description?: string;
  imageUrl?: string;
  type: ResourceType;
  categorie: ResourceCategory;
  url?: string;
  children: ReactNode;
  duree?: number;
  className?: string;
}

export function ResourceCard({
  titre,
  description,
  imageUrl,
  type,
  categorie,
  url,
  children,
  duree,
  className = "",
}: ResourceCardProps) {
  return (
    <div className="resource-card">
      {imageUrl && (
        <div className="resource-card-image-container">
          <img
            src={imageUrl}
            alt={titre || "Image de carte"}
            className="resource-card-image"
          />
        </div>
      )}
      <div className="resource-card-header">
        {titre && <h3 className="resource-card-title">{titre}</h3>}
        {description && (
          <p className="resource-card-description">{description}</p>
        )}
      </div>
      {type && (
        <div className="resource-card-type">
          <h4>Type : {type}</h4>
        </div>
      )}
      {categorie && (
        <div className="resource-card-categorie">
          <h4>Catégorie : {categorie}</h4>
        </div>
      )}
      {children && <div className="resource-card-content">{children}</div>}
      {duree && (
        <div className="resource-card-duree">
          <h6>Durée : {duree} minutes</h6>
        </div>
      )}
      {url && (
        <div className="resource-card-lien">
          <a href={url}>Consulter la ressource</a>
        </div>
      )}
    </div>
  );
}
