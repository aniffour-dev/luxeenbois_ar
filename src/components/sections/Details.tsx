import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

const Details = () => {
  return (
    <div className="max-w-6xl mx-auto mb-16 px-6 lg:px-0">
      <table className="min-w-full bg-white border border-slate-200">
        <tbody>
          <tr className="bg-gray-50">
            <td className="py-4 px-6 text-gray-700 font-semibold">Marque</td>
            <td className="py-4 px-6 text-gray-900">stockage weinstein</td>
          </tr>
          <tr className="bg-white">
            <td className="py-4 px-6 text-gray-700 font-semibold">Matériel</td>
            <td className="py-4 px-6 text-gray-900">Plastique</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-4 px-6 text-gray-700 font-semibold">
              Utilisations recommandées pour le produit
            </td>
            <td className="py-4 px-6 text-gray-900">chaussures</td>
          </tr>
          <tr className="bg-white">
            <td className="py-4 px-6 text-gray-700 font-semibold">
              Dimensions du produit
            </td>
            <td className="py-4 px-6 text-gray-900">
              23,6 "D x 23,6" L x 65 "H ( 59,9 x 59,9 x 165,1 cm )
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-4 px-6 text-gray-700 font-semibold">
              Type d'installation
            </td>
            <td className="py-4 px-6 text-gray-900">Standing gratuit</td>
          </tr>
          <tr className="bg-white">
            <td className="py-4 px-6 text-gray-700 font-semibold">
              Poids de l'emballage
            </td>
            <td className="py-4 px-6 text-gray-900">50.7000 Livres</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="py-4 px-6 text-gray-700 font-semibold">
              Date First Available
            </td>
            <td className="py-4 px-6 text-gray-900">2022-05-24 10:14:33</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Details;
