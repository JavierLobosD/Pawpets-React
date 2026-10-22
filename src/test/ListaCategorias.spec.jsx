import {cleanup, screen} from '@testing-library/react';
import ListaCategorias from '../components/ListaCategorias';
import { renderizar } from './ayudas';

//Pruebas del componente que muestra las tarjetas de categorias
describe('Componente ListaCategorias', () => {
    //Limpia la pantalla despues de cada prueba
    afterEach(cleanup);

    // Categorias de prueba (datos inventados, no los reales)
    const categorias = [
        { id: 1, nombre: 'Alimentos Perro', imagen: '/a.jpg' },
        { id: 2, nombre: 'Salud', imagen: '/b.jpg' },
    ];

    //Debe haber una tarjeta por cada categoria que recibe
    it('muestra el nombre de cada categoría recibida por props', () => {
        renderizar(<ListaCategorias categorias={categorias} />);
        expect(screen.getByText('Alimentos Perro')).toBeTruthy();
        expect(screen.getByText('Salud')).toBeTruthy();
    });

    //Cada tarjeta debe llevar a la pagina de su categoria
    it('cada tarjeta es un link a /categorias/id', () =>{
        renderizar(<ListaCategorias categorias={categorias} />);
        const links = screen.getAllByRole('link');
        expect(links.length).toBe(2);
        expect(links[0].getAttribute('href')).toBe('/categorias/1');
    });
});