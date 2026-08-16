import { useState, type ReactNode } from "react";
import {
  type ResourceType,
  type ResourceCategory,
} from "../../../shared/types";
import "../ResourceCard.css";

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

export function ResourceCard({ titre, description, imageUrl, type, categorie, url, children, duree, className ="" }: ResourceCardProps) {

    return (
        <div className="resource-card-container">
            {imageUrl && (
                <div>
                    <img src={imageUrl}
                </div>
            )}
            <div className="resource-card-header">
                {titre && <h3 className="resource-card-title">{titre}</h3>}
            </div>

        </div>
    )

}
    
        


