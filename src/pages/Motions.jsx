import React from 'react'
import localFont from 'next/font/local';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const roslindaleFont = localFont({
    src: '../fonts/Roslindale-DisplayNarrowRegular-Testing.ttf',
    weight: '400',
    style: 'normal',
    variable: '--font-roslindale'
});
function Motions() {
    return (
        <div>
            <Header />
            <div className='motionsection1'>
                <h1 className={`motionsection1Title ${roslindaleFont.className}`}>
                    Motion
                </h1>
                <p className={`motionsection1para ${roslindaleFont.className}`}>Mantapa, the brainchild of visionary individuals Arth and Priyansh Patel, transcends conventional wedding cinematography by intricately weaving the ephemeral splendor of Indian matrimonial rituals with the nuanced artistry of filmmaking and design.</p>
            </div>
            <div>
                <div className="homepagesection5">
                    <h1 className={`text-[84.9px]  text-[#A80018] leading-[98px] font-bold text-center ${roslindaleFont.className}`}>
                        Title
                    </h1>
                    <div className='homepagesection5motion 3dtiltingcardeffect'>
                        <div className='w-[780px] h-[480px] z-10'>
                            <div class="motion-cms-play">
                                <svg width="20%" viewBox="0 0 20 23" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z" fill="#FFF"></path>
                                </svg>
                            </div>
                            <img className='rounded-[24px]' src="https://s3-alpha-sig.figma.com/img/86cb/3148/87b6774226a403b492c3ad21c6bd50f7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9VAbg8NIm7-jtVKmn9GRx1GPynUoBEbCiHmfEnHuZ4nOxAycLzS0YhwGGuOUVGzgxdG94kG-WTb8stuTYyf8s6hsqNVSDAWod4usk-XdNJydojkGVUwX5yw6kCDAmiQlhN1CORw3Mw8Gt5lpud-KPznf0cWnkomB1lSejjcfP7l88z0af~3691GH7OlaCAXK6qZ4p6i6TiYyzrF5WWBSvrgjUvzgSijyeIYn1EcTwvMpfIkXcQkUYVN1D~nm~FZljuuIOLvFvAhsBSEdR7aiwylYNwcF~IZYxKRyX2r4xKdnIubu~WJU5~QQspOpYXx7bK4RIy3LXEZQR-h6aupHw__" alt="" />
                        </div>
                        <div className='w-[247px] h-[175px] absolute top-[150px] left-[15%] z-10'>
                            <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                        </div>
                        <div className='w-[223px] h-[154px] absolute top-[-10%] right-[15%] -z-[10px]'>
                            <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                        </div>
                        <div className='w-[223px] h-[154px] absolute bottom-[-5%] right-[27%] z-10'>
                            <img className='rounded-[24px]' src='https://s3-alpha-sig.figma.com/img/61e0/0595/c7875b5b4a498b1a456aa039d8c0de29?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Txa5JHb1c0X8sxt-7j2PQHo8PychlW3mrdB7tenoXusGEQzMBMqKJzBOg5dd72L2THoNTIaHNGfubdfzJgYjsAkF2UbbsYXyPOH~-GBhhWV-2MmkJFZXMQO~PF5txUZBeBvjJzs2VJygg1o3U5vsyjGu9DGeEZheI8t3QyeyWHCe13uf1ngkmZQ0jLwbcbhOvEZqEMS0EmncL87Vm0Kbx-qJiqn2nU~vTzrOoqJJEL8OO-lGXeMbQ1gUdXYUeyhB4Dez7tlwOQx76tLw6ajutss3TU9kG5yEVtLMH0kUkHF0vUj0bHU4RImMRxNG7Isr8RvOFytQ02~yRyLODNX0zg__' alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Motions
